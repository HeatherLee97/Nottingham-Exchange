import { useEffect, useState } from "react";
import "../../css/NavBar.css";
import "../../css/ProfilePage.css";
import { useSelector } from "react-redux";

// import Watchlist from "../Watchlist/Watchlist";
// import ProfileNavBar from "./ProfilePage/ProfileNavBar"; 

function ProfilePage() {
  const user = useSelector((state) => state.session.user);
  
  
  
  const [marketNews, setMarketNews] = useState([]);

  useEffect(() => {
    const finnhub = require("finnhub");
    const api_key = finnhub.ApiClient.instance.authentications["api_key"];
    api_key.apiKey = process.env.REACT_APP_FINNHUB_API_KEY_FIRST;
    const finnhubClient = new finnhub.DefaultApi();
    finnhubClient.marketNews("general", {}, (error, data) => {
      if (!error) {
        setMarketNews(data);
      } else {
        console.error("Error fetching market news:", error);
      }
    });
  }, []);

  function getTimeAgo(timestamp) {
    const currentTime = Date.now();
    const articlePublished = new Date(timestamp * 1000);
    const difference = currentTime - articlePublished;
    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;

    if (difference >= oneDay) {
      const daysAgo = Math.floor(difference / oneDay);
      return `${daysAgo} ${daysAgo === 1 ? "day" : "days"} ago`;
    } else if (difference >= oneHour) {
      const hoursAgo = Math.floor(difference / oneHour);
      return `${hoursAgo} ${hoursAgo === 1 ? "hour" : "hours"} ago`;
    } else {
      const minutesAgo = Math.floor(difference / oneMinute);
      return `${minutesAgo} ${minutesAgo === 1 ? "minute" : "minutes"} ago`;
    }
  }

  const marketNewsComponents = marketNews?.map((article, index) => (
    <a key={index} href={article.url} target="_blank" rel="noopener noreferrer">
      <div className="market-news-article">
        <div className="market-news-header">
          <div className="market-news-source">{article.source}</div>
          <div className="market-news-date">{getTimeAgo(article.datetime)}</div>
        </div>
        <div className="market-news-middle-content">
          <div className="market-news-content">
            <div className="market-news-description">
              <div className="market-news-headline">{article.headline}</div>
              <div className="market-news-summary">{article.summary}</div>
            </div>
          </div>
          <div className="market-news-image">
            <img src={article.image} alt="Market news" />
          </div>
        </div>
      </div>
    </a>
  ));

  return (
    <div className="profile-container">
      <div className="nav-bar-profile">
        {/* <ProfileNavBar /> */}
      </div>
      <div className="profile-body-container">
        <div className="left-content">
          <div className="profile-chart">
            
            {/* <UserInvestmentChart
              setRegularMarketPrice={setRegularMarketPrice}
              setToolTipPrice={setToolTipPrice}
            /> */}
          </div>
          <div className="buying-power">
            Buying Power <span>${user.buying_power}</span>
          </div>
          <div className="market-news-container">
            <div className="market-news-title">News</div>
            {marketNewsComponents}
          </div>
        </div>
        {/* <Watchlists /> */}
      </div>
    </div>
  );
}

export default ProfilePage;
