
interface TwitterTrend {
  name: string;
  url: string;
  tweet_volume: number | null;
}

export async function fetchTwitterTrends(): Promise<TwitterTrend[]> {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '4165bde341msh63891d837ee53c5p1a32e9jsn660d93eb755c',
      'X-RapidAPI-Host': 'twitter-api45.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(
      'https://twitter-api45.p.rapidapi.com/trends.php?country=UnitedStates', 
      options
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch Twitter trends');
    }
    
    const data = await response.json();
    return data.trends || [];
  } catch (error) {
    console.error('Error fetching Twitter trends:', error);
    return [];
  }
}
