import os
import requests
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
from langchain.prompts import PromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains import LLMChain
from dotenv import load_dotenv
from bs4 import BeautifulSoup








# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Allow requests from the frontend

# Initialize Gemini LLM with API Key
def initialize_llm():
    gemini_api_key = os.getenv("GEMINI_API_KEY")  # Use environment variable for security
    model_name = "gemini-1.5-pro-latest"
    llm = ChatGoogleGenerativeAI(api_key=gemini_api_key, model=model_name)
    return llm

# Define prompt template
prompt_template = PromptTemplate(
    input_variables=["user_query"],
    template="""
    You are an experienced financial planner. Your task is to provide clear and comprehensive advice on financial investments.
    Only answer queries strictly related to finance, investments, or financial planning. If the query is unrelated, respond with:
    'This query is not related to finance. Please ask questions about financial investments or planning.'

    Query: {user_query}

    Provide actionable steps, potential risks, and benefits if applicable.
    
    IMPORTANT: Format your response in plain text only. Do not use markdown.
    """
)

# Create financial planner chain
def create_financial_planner_chain(llm):
    chain = LLMChain(llm=llm, prompt=prompt_template)
    return chain

# Initialize LLM and chain
llm = initialize_llm()
financial_planner_chain = create_financial_planner_chain(llm)

# Route to handle user queries
@app.route('/ask', methods=['POST'])
def handle_query():
    data = request.json
    user_query = data.get("user_query", "")
    
    if not user_query:
        return jsonify({"error": "No query provided."}), 400

    response = financial_planner_chain.run({"user_query": user_query})
    
    return jsonify({"response": response})

# Route to fetch YouTube video links
YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")  # Use environment variable for security
BASE_URL = os.getenv("BASE_URL")

@app.route('/get_videos', methods=['POST'])
def get_video_links():
    data = request.json
    question = data.get("question", "")
    
    if not question:
        return jsonify({"error": "No query provided."}), 400

    params = {
        'part': 'snippet',
        'q': question,
        'key': YOUTUBE_API_KEY,
        'type': 'video',
        'maxResults': 5
    }

    try:
        response = requests.get(BASE_URL, params=params)
        response.raise_for_status()  # Raise an exception for HTTP errors
        data = response.json()

        if 'error' in data:
            logging.error(f"YouTube API error: {data['error']['message']}")
            return jsonify({"error": data['error']['message']}), 400

        video_links = [f'https://www.youtube.com/watch?v={item["id"]["videoId"]}' for item in data.get('items', [])]
        return jsonify({"videos": video_links})

    except requests.exceptions.RequestException as e:
        logging.error(f"Error fetching videos from YouTube API: {e}")
        return jsonify({"error": "Failed to fetch videos from YouTube API."}), 500

# Route to get investment recommendations
@app.route('/get_investment_options', methods=['POST'])
def get_investment_options():
    data = request.json
    logging.debug(f"Received data: {data}")  # Log incoming data

    age = data.get("age")
    horizon = data.get("horizon")
    period = data.get("period")
    investment_type = data.get("investment_type")
    amount = data.get("amount")
    print(amount)

    if None in [age, horizon, period, investment_type, amount]:
        logging.error("Missing required fields in request")
        return jsonify({"error": "All fields are required."}), 400

    recommendations = get_investment_recommendations(age, horizon, period, investment_type, amount)
    logging.debug(f"Generated recommendations: {recommendations}")  # Log recommendations

    return jsonify({"recommended_investments": recommendations})

# Function to recommend investments
def get_investment_recommendations(age, horizon, period, investment_type, amount):
    investments = [
        {"name": "Real Estate Investment", "age_range": (25, 50), "horizon": "long", "min_period": 5, "type": "lumpsum", "risk": "medium-high"},
        {"name": "Fixed Deposit", "age_range": (0, 100), "horizon": "both", "min_period": 1, "type": "lumpsum", "risk": "low"},
        {"name": "Gold Investment", "age_range": (0, 100), "horizon": "both", "min_period": 0, "type": "lumpsum", "risk": "medium"},
        {"name": "Share Market", "age_range": (20, 45), "horizon": "long", "min_period": 5, "type": "both", "risk": "high"},
        {"name": "SWP Mutual Funds", "age_range": (35, 100), "horizon": "long", "min_period": 5, "type": "recurring", "risk": "medium"},
        {"name": "Index Funds", "age_range": (20, 50), "horizon": "long", "min_period": 5, "type": "both", "risk": "medium"},
        {"name": "ULIP Plans", "age_range": (25, 45), "horizon": "long", "min_period": 10, "type": "recurring", "risk": "medium"},
        {"name": "Post Office Schemes", "age_range": (30, 100), "horizon": "both", "min_period": 1, "type": "recurring", "risk": "low"},
        {"name": "Startup Investment", "age_range": (25, 40), "horizon": "long", "min_period": 5, "type": "lumpsum", "risk": "high"},
        {"name": "Senior Citizen Savings", "age_range": (60, 100), "horizon": "long", "min_period": 5, "type": "lumpsum", "risk": "low"},
        {"name": "REIT", "age_range": (25, 50), "horizon": "long", "min_period": 5, "type": "lumpsum", "risk": "medium"},
        {"name": "LIC", "age_range": (0, 100), "horizon": "both", "min_period": 0, "type": "both", "risk": "low-medium"}
    ]

    recommended = []
    for inv in investments:
        age_ok = inv["age_range"][0] <= age <= inv["age_range"][1]
        horizon_ok = inv["horizon"] == horizon.lower() or inv["horizon"] == "both"
        period_ok = period >= inv["min_period"]
        type_ok = inv["type"] == investment_type.lower() or inv["type"] == "both"

        if age_ok and horizon_ok and period_ok and type_ok:
            recommended.append(inv["name"])
        print(recommended)

    return recommended



def get_lic_policies():
    url = "https://licindia.in/insurance-plan"
    headers = {"User-Agent": "Mozilla/5.0"}
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, "html.parser")
        
        # Categories to scrape
        target_categories = {"Endowment Plans", "Money Back Plans", "Term Insurance Plans", "Pension Plans"}
        policy_categories = {}

        # Find all accordion items which represent categories
        for accordion_item in soup.find_all("div", class_="accordion-item"):
            category_button = accordion_item.find("button", class_="accordion-button")
            if not category_button:
                continue
            
            category_name = category_button.text.strip()
            
            if category_name in target_categories:
                policies = []
                table = accordion_item.find("table", class_="table")
                if table:
                    for row in table.find("tbody").find_all("tr"):
                        cols = row.find_all("td")
                        if len(cols) >= 2:
                            link_tag = cols[1].find("a")
                            if link_tag:
                                title = link_tag.text.strip()
                                link = link_tag["href"]
                                description = cols[2].text.strip() if len(cols) > 2 else ""
                                if not link.startswith("http"):
                                    link = "https://licindia.in" + link
                                policies.append({
                                    "title": title,
                                    "link": link,
                                    "description": description
                                })
                
                policy_categories[category_name] = policies

        return policy_categories
    except requests.RequestException as e:
        return {"error": f"Failed to fetch data: {str(e)}"}
    except Exception as e:
        return {"error": f"An unexpected error occurred: {str(e)}"}

@app.route("/lic_policies")
def lic_policies():
    policies = get_lic_policies()
    return jsonify(policies)




# Run the app
if __name__ == "__main__":
    app.run(debug=True)