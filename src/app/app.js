"use client";
import "./globals.css";
import appStyles from "./app.module.css";
import AddExpenses from "./addExpenses";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "./localStorage";
import { getFromLocalStorage } from "./localStorage";
import { Transactions } from "./transaction";
import { QuickAccess } from "./navigations";
import Asserts from "./asserts";

const icons = [
  { name: "Food", src: "/icons/fast-food.png" },
  { name: "Internet", src: "/icons/wifi.png" },
  { name: "Travel", src: "/icons/airplane.png" },
  { name: "Drink", src: "/icons/soft-drink.png" },
  { name: "Ride", src: "/icons/uber.png" },
  { name: "meceleneous", src: "/icons/bill.png" },
];

const quickAccessIcons = {
  home: { name: "Home", src: "/icons/home-96.png" },
  add: { name: "Add", src: "/icons/add.png" },
};

export default function App() {
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [home, setHome] = useState(true);
  const [createNew, setCreateNew] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState([]);
  const [quickAccess, setQuickAccess] = useState(true);
  const [quickAccessIcon, setQuickAccessIcon] = useState(quickAccessIcons.add);
  const handleAdd = () => {
    setHome(!home);
    setCreateNew(!createNew);
    return !home
      ? setQuickAccessIcon(quickAccessIcons.add)
      : setQuickAccessIcon(quickAccessIcons.home);
  };

  const handleDelete = (id) => {
    let items = transactions.filter((item) => {
      return Number(item.id) != Number(id);
    });

    let stored = getFromLocalStorage(db);
    let clear = () => {
      setTransactions(items);
    };
    const myTimeout = setTimeout(clear, 300);
    stored["transactions"] = items;
    localStorage.setItem(db, JSON.stringify(stored));
  };
  function trackTransaction(trans) {
    setNewTransaction(trans);
  }
  useEffect(() => {
    if (!transactions) return;
    const calculatedTotal = transactions.reduce(
      (acc, item) => acc + Number(item.amount),
      0
    );
    setTotalExpenses(calculatedTotal);
  }, [trackTransaction]);

  useEffect(() => {
    let data = getFromLocalStorage(db);
    setTransactions(data.transactions);
    handleAdd();
  }, [newTransaction]);

  return (
    <div className={appStyles.app}>
      <div className={appStyles.contents}>
        {home && (
          <>
            <Asserts
              totalExpenses={totalExpenses}
              totalBalance={totalBalance}
              totalIncome={totalIncome}
            />

            <Transactions items={transactions} handleDelete={handleDelete} />
          </>
        )}
        {createNew && (
          <AddExpenses items={icons} trackTransaction={trackTransaction} />
        )}
      </div>

      {quickAccess && (
        <QuickAccess handleAdd={handleAdd} icon={quickAccessIcon} />
      )}
    </div>
  );
}
