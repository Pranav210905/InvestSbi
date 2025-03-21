import os
import requests
import logging
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from langchain.prompts import PromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains import LLMChain
from dotenv import load_dotenv
from bs4 import BeautifulSoup
import io
from werkzeug.utils import secure_filename
import fitz  # PyMuPDF for PDFs
import pytesseract
from PIL import Image
from langchain_groq import ChatGroq
from datetime import datetime

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Allow requests from the frontend
CORS(app, supports_credentials=True, origins=["http://127.0.0.1:5174"])


# Initialize Gemini LLM with API Key
def initialize_llm():
    gemini_api_key = "AIzaSyAEzctJ3QK61LAUjmIoTEvDuTV9FFKt-vc"  # Use environment variable for security
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

# Route to scrape mutual funds from ET Money
@app.route("/get-mutual-funds", methods=["GET"])
def scrape_et_money():
    URL = "https://www.etmoney.com/mutual-funds/featured"
    response = requests.get(URL, headers={"User-Agent": "Mozilla/5.0"})
    if response.status_code != 200:
        return jsonify({"error": "Failed to retrieve data"}), 500
    
    soup = BeautifulSoup(response.text, "html.parser")
    items = soup.find_all("div", class_="feature-category-item-list")
    
    funds = []
    for item in items:
        for fund in item.find_all("div", class_="item"):
            title = fund.find("h4", class_="h4").text.strip()
            image = fund.find("img")["src"]
            link = "https://www.etmoney.com" + fund.find("a")["href"]
            funds.append({"title": title, "image": image, "link": link})
    
    return jsonify(funds)

# Route to get LIC policies
@app.route("/lic_policies", methods=["GET"])
def lic_policies():
    policies = get_lic_policies()
    return jsonify(policies)

# Helper function to get LIC policies
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

# Route to get Post Office policies
#@app.route("/post_office_policies", methods=["GET"])
#def post_office_policies():
   # return jsonify(get_post_office_policies())

# Helper function to get Post Office policies
@app.route("/post_office_policies", methods=["GET"])
def get_post_office_policies():
    url = "https://www.indiapost.gov.in/Financial/pages/content/post-office-saving-schemes.aspx"
    headers = {"User-Agent": "Mozilla/5.0"}
    response = requests.get(url, headers=headers)

    if response.status_code != 200:
        return {"error": "Failed to fetch policies"}

    soup = BeautifulSoup(response.text, "html.parser")
    policies = {}

    for item in soup.find_all("li", class_="li_header"):
        title_tag = item.find("a")
        content_tag = item.find("div", class_="li_content")

        if title_tag and content_tag:
            title = title_tag.text.strip()
            description = content_tag.get_text(strip=True)  # Extract text content
            
            # Categorizing schemes based on keywords in title (you can improve this)
            if "saving" in title.lower():
                category = "Savings Schemes"
            elif "deposit" in title.lower():
                category = "Time Deposits"
            elif "income" in title.lower():
                category = "Monthly Income Schemes"
            elif "senior" in title.lower():
                category = "Senior Citizens Schemes"
            elif "recurring" in title.lower():
                category = "Recurring Deposits"
            else:
                category = "Other Schemes"

            if category not in policies:
                policies[category] = []

            policies[category].append({
                "title": title,
                "description": description,
                "interestRate": "Varies",  # Add proper interest rate if available
                "minInvestment": "Depends on scheme",  # Placeholder
                "tenure": "Depends on scheme",  # Placeholder
                "link": url  # Link to the main page
            })

    return policies  # Returning categorized dictionary

# Route to get Gold prices
@app.route("/gold_prices", methods=["GET"])
def gold_prices():
    prices = get_gold_prices()
    return jsonify(prices)

# Helper function to get Gold prices
def get_gold_prices():
    try:
        url = "https://economictimes.indiatimes.com/markets/gold-rate"
        headers = {"User-Agent": "Mozilla/5.0"}
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, "html.parser")
        gold_data = []

        # Extract current gold rates
        current_price_div = soup.find("div", class_="goldPrice")
        if current_price_div:
            current_price = current_price_div.find("span").text.strip()
            gold_data.append({
                "type": "Current 24K Gold Price",
                "price": current_price,
                "change": "N/A",
                "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            })

        # Extract historical data
        table = soup.find("table", class_="goldSilverTable")
        if table:
            for row in table.find("tbody").find_all("tr"):
                cols = row.find_all("td")
                if len(cols) >= 3:
                    gold_data.append({
                        "type": cols[0].text.strip(),
                        "price": cols[1].text.strip(),
                        "change": cols[2].text.strip(),
                        "timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                    })

        return {
            "categories": {
                "Current Prices": [d for d in gold_data if d["type"] == "Current 24K Gold Price"],
                "Historical Prices": [d for d in gold_data if d["type"] != "Current 24K Gold Price"]
            }
        }
    except requests.RequestException as e:
        return {"error": f"Failed to fetch gold prices: {str(e)}"}
    except Exception as e:
        return {"error": f"An unexpected error occurred: {str(e)}"}
    


app.config['UPLOAD_FOLDER'] = "uploads"

# Ensure upload folder exists
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Initialize LLM Model (Replace with actual API setup)
llm = ChatGroq(
    temperature=0.6,
    groq_api_key='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',
    model_name="llama-3.3-70b-versatile"
)

# Route for file upload and analysis
@app.route('/upload_file', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Save file securely
    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)

    text = ""

    try:
        # Process PDF Files
        if filename.lower().endswith('.pdf'):
            text = extract_text_from_pdf(file_path)

        # Process Image Files
        elif filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            text = extract_text_from_image(file_path)

        else:
            return jsonify({"error": "Unsupported file type"}), 400

        # If no text extracted, return an error
        if not text.strip():
            return jsonify({"error": "No readable text found in the file"}), 400

        # Process text with LLM
        extracted_data = analyze_financial_document(text)
        return jsonify({"analysis": extracted_data})

    except Exception as e:
        logging.error(f"Error processing file: {str(e)}")
        return jsonify({"error": f"Internal Server Error: {str(e)}"}), 500

# Helper function to extract text from PDF
def extract_text_from_pdf(pdf_path):
    """Extracts text from a PDF using OCR"""
    text = ""
    try:
        doc = fitz.open(pdf_path)
        for page_num in range(min(5, len(doc))):  # Process up to 5 pages
            page = doc.load_page(page_num)
            pix = page.get_pixmap()
            img = Image.open(io.BytesIO(pix.tobytes("png"))).convert('RGB')
            text += pytesseract.image_to_string(img) + "\n"
    except Exception as e:
        logging.error(f"PDF Processing Error: {str(e)}")
        raise
    return text

# Helper function to extract text from image
def extract_text_from_image(image_path):
    """Extracts text from an image using OCR"""
    try:
        img = Image.open(image_path).convert('RGB')
        return pytesseract.image_to_string(img)
    except Exception as e:
        logging.error(f"Image Processing Error: {str(e)}")
        raise

# Helper function to analyze financial document
def analyze_financial_document(text):
    """Analyzes financial document text using an AI model"""
    prompt = (
        f"Consider yourself as an experienced financial professional with expertise in investments, banking, and financial instruments.\n"
        f"Analyze the following document text carefully:\n\n"
        f"{text}\n\n"
        f"### Instructions:\n"
        f"1. **Determine the Type of Document** - Identify if it is related to investments, banking, taxation, financial agreements, etc.\n"
        f"2. **Provide a Full Explanation** - Explain what the document is about and its significance.\n"
        f"3. **Extract Key Details** - Identify any critical financial details present in the document.\n"
        f"4. **Explain Calculations** - If there are any financial formulas or calculations, perform the calculations and show the results.\n"
        f"5. **Insights** - Provide any additional insights or important warnings based on the document content.\n"
        f"6. **Restriction** - If the document is NOT related to finance, investments, or banking, respond with: 'This document is not financial-related.'\n"
        f"7. **Output Format:**\n"
        f"{{\n"
        f'"document_type": "Type of document",\n'
        f'"explanation": "Full explanation of the document",\n'
        f'"key_details": ["Detail 1", "Detail 2", ...],\n'
        f'"calculations": ["Calculations based on the information present."],\n'
        f'"insights": "Additional useful insights from the document"\n'
        f"}}"
    )

    response = llm.invoke(prompt)
    print(response)
    return response.content.strip()

URL = "https://www.bankbazaar.com/gold-rate-india.html"

def scrape_gold_rates():
    response = requests.get(URL, headers={"User-Agent": "Mozilla/5.0"})
    soup = BeautifulSoup(response.text, 'html.parser')

    # Adjust this selector based on actual structure of the website
    table = soup.find("table")
    if not table:
        return []  # Fallback if table isn't found

    rows = table.find("tbody").find_all("tr")

    gold_rates = []
    for row in rows:
        cols = row.find_all("td")
        if len(cols) < 3:
            continue
        city = cols[0].text.strip()
        gold_22k = cols[1].text.strip()
        gold_24k = cols[2].text.strip()

        gold_rates.append({
            "city": city,
            "gold_22k": gold_22k,
            "gold_24k": gold_24k
        })

    return gold_rates

@app.route('/get_gold_rates')
def get_gold_rates():
    try:
        data = scrape_gold_rates()
        return jsonify(data)
    except Exception as e:
        print("Error while scraping:", e)
        return jsonify([]), 500



# Run the app
if __name__ == "__main__":
    app.run(debug=True)