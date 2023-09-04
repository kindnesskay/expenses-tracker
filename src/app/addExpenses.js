import { useEffect, useState } from "react";
import appStyles from "./app.module.css";
import Category from "./category";
import { db } from "./localStorage";
export default function AddExpenses({ items, trackTransaction }) {
  const [showItems, setShowItems] = useState(false);
  const [data, setData] = useState({});
  const [trackData, setTrackData] = useState();
  const handleClick = () => {
    setShowItems(!showItems);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setTrackData(data);
    trackTransaction(data);
  };

  const getCategory = (category) => {
    setData({ ...data, category });
  };
  const getAmount = (amount) => {
    setData({ ...data, amount });
  };
  const getNote = (note) => {
    setData({ ...data, note: note });
  };

  useEffect(() => {
    if (!trackData) return;
    if (localStorage.getItem(db)) {
      let stored = localStorage.getItem(db);
      stored = JSON.parse(stored);
      let newData = [...stored, trackData];
      localStorage.setItem(db, JSON.stringify(newData));
      return;
    }
    localStorage.setItem(db, JSON.stringify([trackData]));
  }, [trackData]);
  return (
    <ExpensesForm
      items={items}
      showItems={showItems}
      getAmount={getAmount}
      getNote={getNote}
      getCategory={getCategory}
      handleClick={handleClick}
      handleSubmit={handleSubmit}
    />
  );
}
export function ExpensesForm({
  handleClick,
  getAmount,
  getNote,
  items,
  showItems,
  getCategory,
  handleSubmit,
}) {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  return (
    <div className={appStyles.addExpenses}>
      <h1>Add Expenses</h1>
      <form className={appStyles.expensesForm} onSubmit={handleSubmit}>
        <Category
          items={items}
          handleClick={handleClick}
          dropDown={showItems}
          getCategory={getCategory}
        />
        {!showItems && (
          <>
            <input
              required
              type="text"
              name="note"
              placeholder="Add note"
              value={note}
              onChange={(e) => {
                setNote(e.target.value);
                getNote(e.target.value);
              }}
            />
            <input
              required
              type="number"
              name="amount"
              placeholder="100"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                getAmount(e.target.value);
              }}
            />
            <input type="submit" value="Add" />
          </>
        )}
      </form>
    </div>
  );
}
