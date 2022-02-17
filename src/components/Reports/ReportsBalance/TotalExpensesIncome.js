import { useSelector } from "react-redux";
import { getSummary, getDate } from "../../../redux/report/report-selectors";
import { useEffect, useState } from "react";
import styles from "./TotalExpensesIncome.module.css";

function TotalExpensesIncome() {
  const summary = useSelector(getSummary);
  const [income, setIncome] = useState(null);
  const [expences, setExpences] = useState(null);
  const date = useSelector(getDate);
  const currentDate = date ? date : "2022-01-01"
  const getProfit = () => {
    const {
      profit: { totalAmount },
    } = summary.find((el) => el.startDate === currentDate);
    setIncome(totalAmount);
  };

  const getCosts = () => {
    const {
      costs: { totalAmount },
    } = summary.find((el) => el.startDate === currentDate);
    setExpences(totalAmount);
  };
  useEffect(() => {
    getProfit();
    getCosts();
  }, [date, summary]);

  return (
    <div className={styles.componentBox}>
      <ul className={styles.balanceList}>
        <li className={styles.balanceItem}>
          <p className={styles.balanceText}>Расходы:</p>
          <span className={styles.expensesValue}>{ expences?`- ${expences} грн.`:'00.00 грн.'}</span>
        </li>
        <li className={styles.balanceItem}>
          <p className={styles.balanceText}>Доходы:</p>
          <span className={styles.incomeValue}>{income?`+ ${income} грн.`:'00.00 грн.'}</span>
        </li>
      </ul>
    </div>
  );
}

export default TotalExpensesIncome;
