//Modules
import React from "react";
import uuid4 from "uuid";
//Sass
import styles from "./ShoppingList.module.scss";

export default function ShoppingList(props) {
  const getTotal = list => {
    const total = list.reduce((total, current) => {
      const num = parseInt(current.price);
      return total + num;
    }, 0);
    return total;
  };

  return (
    <>
      <div className={styles.Backdrop} onClick={props.toggleModal} />
      <div className={styles.Modal}>
        {props.shoppingList.map(item => {
          return (
            <div key={uuid4()} className={styles.ShoppingItem}>
              <p className={styles.Name}>{item.name}:</p>
              {item.price > 0 ? (
                <p className={styles.Price}>
                  {" "}
                  ฿ {item.price} {item.per && <span>per {item.per}</span>}
                </p>
              ) : (
                <p className={styles.Price}>Unknown</p>
              )}
            </div>
          );
        })}
        <h3>Total: ฿{getTotal(props.shoppingList)}</h3>
      </div>
    </>
  );
}
