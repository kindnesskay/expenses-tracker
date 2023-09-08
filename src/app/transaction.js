"use client";
import { useState } from "react";
import appStyles from "./app.module.css";
import Image from "next/image";

export function Transactions({ items, handleDelete }) {
  return (
    <div className={appStyles.transactions}>
      <div className={appStyles.transactionActions}>
        <p>Transactions</p>
      </div>

      <div className={appStyles.transactionHistory}>
        {items.map((data) => {
          return (
            <Transaction
              key={data.id}
              category={data.category}
              note={data.note}
              amount={data.amount}
              date={data.date}
              handleDelete={() => {
                handleDelete(data.id);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
export function Transaction({ category, note, amount, date, handleDelete }) {
  const [transaction_class, setTransaction_class] = useState(
    appStyles.transaction
  );
  function animationOnDelete() {
    setTransaction_class(transaction_class + " " + appStyles.animate_delete);
    handleDelete();
  }
  return (
    <div className={transaction_class}>
      <div className={appStyles.descriptionLeft}>
        <Image
          loading="lazy"
          height={50}
          width={50}
          className={appStyles.circleFrame}
          src={category.src}
          alt={category.name}
        />
        <span>{note}</span>
      </div>
      <div className={appStyles.descriptionRight}>
        <span>{amount}</span>
        <span>{date}</span>
      </div>
      <Image
        onClick={animationOnDelete}
        src={"/icons/delete-90.png"}
        height={30}
        width={30}
        alt="delete"
        className={appStyles.delete}
      />
    </div>
  );
}
