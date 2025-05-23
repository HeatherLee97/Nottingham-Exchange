import './CurrentStocks.css';

function CurrentStocksCard() {

    return (
        <div className='current-stocks-container'>

            <h1
            className='current-head-text'
            >
                Crypto
            </h1>

            <div
            className='watch-stock-container'
            >
                <p
                className='para-watch'
                >
                    stock name
                </p>

                <p
                className='para-watch'
                >
                    stock price
                </p>
                <p
                className='para-watch'
                >
                    percentage change ^%
                </p>
            </div>

            
        </div>
    )
}
