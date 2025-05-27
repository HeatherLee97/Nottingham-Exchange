import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

function WalletForm() {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("bank");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);
  // const [info, setInfo] = useState(""); // Only use if needed

  const user = useSelector((state) => state.session.user);
  const balance = useSelector((state) => state.wallet.balance);
  const dispatch = useDispatch();

  useEffect(() => {
    // Optional: fetch wallet info or set something when component mounts
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Implement form submission logic here
    // Dispatch an action or make an API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1000);
  };

  return (
    <div className="wallet-form">
      <h2>Wallet</h2>
      <p>Current Balance: ${balance}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>
        <label>
          Payment Method:
          <select value={method} onChange={(e) => setMethod(e.target.value)}>
            <option value="bank">Bank Transfer</option>
            <option value="card">Credit Card</option>
          </select>
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Add Funds"}
        </button>
      </form>
      {success && <p className="success-message">Funds added successfully!</p>}
      {errors.length > 0 &&
        errors.map((err, i) => <p key={i} className="error">{err}</p>)}
    </div>
  );
}

export default WalletForm;
