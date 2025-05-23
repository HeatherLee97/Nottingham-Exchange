import React from "react";
import WatchlistWidget from "../WatchlistWidget";
import StockChart from "../..components/StockDetailsPage/StockChart";

import "./UserHomePage.css";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchHistory, clearHistoryState } from "../../store/portfolioHistory";
import HomeChart from "./HomeChart";
import { fetchAllInvestments, clearInvestmentState } from "../../store/investments";
import { Redirect } from "react-router-dom";



function UserHomePage() {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session?.user);
    

    useEffect(() => {

      dispatch(fetchHistory());
      dispatch(fetchAllInvestments());
      return () => {
          dispatch(clearHistoryState());
          dispatch(clearInvestmentState());
      };
    }, [dispatch]);

      if (!user) return <Redirect to="/login" />;


    return (
        <div className="app-body">
            <div className="app-container">
                <HomeChart />
                <WatchlistWidget />
            </div>
        </div>
    )
}

export default UserHomePage;