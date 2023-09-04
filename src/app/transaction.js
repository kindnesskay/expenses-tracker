"use client";
import appStyles from "./app.module.css";
import Image from "next/image";

export function Transactions({ items }) {
  return (
    <div className={appStyles.transactions}>
      <div className={appStyles.transactionActions}>
        <p>Transactions</p>
      </div>

      <div className={appStyles.transactionHistory}>
        {items.map((data, index) => {
          return (
            <Transaction
              key={index}
              category={data.category}
              note={data.note}
              amount={data.amount}
              date={data.date}
            />
          );
        })}
      </div>
    </div>
  );
}
export function Transaction({ category, note, amount, date, handleDelete }) {
  return (
    <div className={appStyles.transaction}>
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
        onClick={handleDelete}
        src={"/icons/delete-90.png"}
        height={30}
        width={30}
        alt="delete"
        className={appStyles.delete}
      />
    </div>
  );
}
