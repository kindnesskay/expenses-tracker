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
  const [transactions, setTransactions] = useState(false);
  const [newTransaction, setNewTransaction] = useState([]);
  const [quickAccess, setQuickAccess] = useState(true);
  const [quickAccessIcon, setQuickAccessIcon] = useState(quickAccessIcons.add);
  const handleAdd = () => {
    setHome(!home);
    setCreateNew(!createNew);
    if (quickAccessIcon == quickAccessIcons.home && home == true) {
      setQuickAccessIcon(quickAccessIcons.add);
      return;
    }
    setQuickAccessIcon(quickAccessIcons.home);
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

  useEffect(() => {
    if (getFromLocalStorage(db)["id"]) return;
    newStorage();
    fixStorage();
  }, []);

  function fixStorage() {
    if (!localStorage.getItem(db)) return;
    let oldStorage = getFromLocalStorage(db);
    if (oldStorage["transactions"][0]["trackData"]) {
      localStorage.removeItem(db);
    }
    if (oldStorage["transactions"]["transaction"]) {
      localStorage.removeItem(db);
    }
  }
  function newStorage() {
    if (!localStorage.getItem(db)) return;
    oldStorage = oldStorage.map((item, index) => {
      return { id: index + 1, ...item };
    });
    let template = { id: oldStorage.length, transactions: oldStorage };
    localStorage.setItem(db, JSON.stringify(template));
  }
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

            {transactions && (
              <Transactions items={transactions} handleDelete={handleDelete} />
            )}
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
