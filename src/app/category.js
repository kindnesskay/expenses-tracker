"use client";
import appStyles from "./app.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
export function DropDownItems({ items, handleClick }) {
  return (
    <ul className={appStyles.dropDownItems}>
      {items.map((item, index) => {
        return (
          <li
            key={index}
            onClick={() => {
              handleClick(item);
            }}
          >
            {item.name}
            <Image height={20} width={20} src={item.src} alt={item.name} />
          </li>
        );
      })}
    </ul>
  );
}
export default function Category({
  items,
  handleClick,
  dropDown,
  getCategory,
}) {
  const [category, setCategory] = useState({
    name: "Category",
    src: "/icons/app.png",
  });

  useEffect(() => {
    getCategory(category);
  }, [category]);
  const getSelectedCategory = (item) => {
    setCategory(item);
  };
  return (
    <div className={appStyles.category} onClick={handleClick}>
      <p>{category.name}</p>
      <Image height={20} width={20} src={category.src} alt={category.name} />
      {dropDown && (
        <DropDownItems items={items} handleClick={getSelectedCategory} />
      )}
    </div>
  );
}
