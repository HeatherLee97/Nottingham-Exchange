import React, {useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import StockDetails from "../StockDetailsPage/StockDetails";
// import Counter from "../Counter";
import './Newsfeed.css';
import { use } from "react";


function Newsfeed() {
    const user = useSelector((state) => state.session.user);
    const transactions = useSelector((state) => state.transactions);
    const [date, setDate] = useState(new Date());
    const [balance, setBalance] = useState(0);
    const beginningBalance = useRef(user?.balance);
    let difference = useRef(0);
    let percentage = useRef(0);

    let balanceArray = [startingBalance.current]
    
    const startDate = () => {
        let dates = [];
        for (let i = 0; i < 30; i++) {
            let date = new Date();
            date.setHours(date.getHours() - i);
            dates.setDate(i);
            dates.push(date);
        }
    }

    useEffect(() => {
        transactions.forEach((transaction) => {
            if (transaction.type === "buy") {
                setBalance((prevBalance) => prevBalance - transaction.amount);
            } else if (transaction.type === "sell") {
                setBalance((prevBalance) => prevBalance + transaction.amount);
            } else if (transaction.type === "deposit") {
                setBalance((prevBalance) => prevBalance + transaction.amount);
            } else if (transaction.type === "withdraw") {
                setBalance((prevBalance) => prevBalance - transaction.amount);
            } else {
                return;
            }
        });

        const graphProps = {
            dates: date,
            balance: balance,
            xdisplay: false,
            ydisplay: true,
            timeFormate: 'MM/dd/yyyy HH:mm',
        }
    })
    return ( 
        <div className="newsfeed_container">
            <div className="newsfeed_chart">
                <div className="portfolio_newsfeed">
                    <h1>Portfolio</h1>
                    <div className="portfolio_balance">
                        <h2>Balance: ${balance}</h2>
                        <h2>Change: ${difference.current} ({percentage.current}%)</h2>
                    </div>
                    <div className="portfolio_graph">
                        <Counter graphProps={graphProps}/>
                    </div>  
                </div>

            </div>
        </div>
    )
}


export default Newsfeed;