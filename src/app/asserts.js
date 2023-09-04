import appStyles from "./app.module.css";
export default function Asserts({ totalExpenses, totalIncome, totalBalance }) {
  return (
    <div className={appStyles.asserts}>
      <div className={appStyles.availableBalance}>
        <p>Total Balance</p>
        <span>{totalBalance}</span>
      </div>

      <div className={appStyles.spending}>
        <div>
          <p className={appStyles.whiteText}>Income</p>
          <span>{totalIncome}</span>
        </div>

        <div>
          <p className={appStyles.whiteText}>Expenses</p>
          <span>{totalExpenses}</span>
        </div>
      </div>
    </div>
  );
}
