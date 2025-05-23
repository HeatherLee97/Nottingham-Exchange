import { useState } from "react";

import "./BuyStockModal.css";

function BuyStockModal() {
    const [shares, setShares] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    return (
        <>
        <h1>Buy This Stock</h1>
        <form onSubmit={handleSubmit}>
        <label>
            price stockprice
        </label>
        <label>Shares
            <input
            type="text"
            value={shares}
            onChange={(e) => setShares(e.target.value)}
            required
            />

        </label>
        <button
        type="submit"
        className="buy-modal-button"
        >
            Buy Now
        </button>
        </form>
        </>
    );
}

export default BuyStockModal;
