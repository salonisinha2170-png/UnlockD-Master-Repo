import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [accounts, setAccounts] = useState<any[]>([]);
  const [budget, setBudget] = useState(0);
  const [spent, setSpent] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
  fetch("http://127.0.0.1:8000/budget")
    .then((res) => res.json())
    .then((data) => {
      console.log("Budget API:", data);

      setBudget(Number(data.totalBudget) || 0);
      setSpent(Number(data.spent) || 0);
      setRemaining(Number(data.remaining) || 0);
    })
    .catch((err) => console.error("Budget Error:", err));

  fetch("http://127.0.0.1:8000/accounts")
    .then((res) => res.json())
    .then((data) => {
      console.log("Accounts API:", data);
      setAccounts(data);
    })
    .catch((err) => console.error("Accounts Error:", err));
}, []);

  const transferMoney = () => {
    if (!from || !to || !amount) {
      alert("Please fill all fields");
      return;
    }

    alert(`₹${amount} transferred from ${from} to ${to}`);

    setFrom("");
    setTo("");
    setAmount("");
  };

  return (
    <div className="container">
      <h1>💰 FinFlow 💰</h1>
      <p className="subtitle">Personal Finance & Expense Manager</p>

      <div className="balance-card">
        <h2>Available Balance</h2>
        <h1>
          {accounts.length > 4
            ? `₹${accounts[4].balance}`
            : "Loading..."}
        </h1>
      </div>
    <div className="balance-card">
  <h2>📊 Monthly Budget</h2>

  <p>Total Budget: ₹{budget}</p>
  <p>Spent: ₹{spent}</p>
  <p>Remaining: ₹{remaining}</p>

  <progress
    value={spent}
    max={budget}
    style={{ width: "100%", height: "20px" }}
  />

  {remaining <= budget * 0.2 && (
    <p style={{ color: "red", marginTop: "10px" }}>
      ⚠️ Budget Limit Reached
    </p>
  )}
</div>
      <div className="transfer-box">
        <h2>Transfer Money</h2>

        <input
          type="text"
          placeholder="From Account"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
        />

        <input
          type="text"
          placeholder="To Account"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button onClick={transferMoney}>Transfer</button>
      </div>

      <div className="history">
        <h2>Recent Transactions</h2>

        <table>
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Saloni</td>
              <td>Anwesha</td>
              <td>₹1000</td>
              <td>✅ Success</td>
            </tr>

            <tr>
              <td>Aman</td>
              <td>Priya</td>
              <td>₹500</td>
              <td>✅ Success</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;