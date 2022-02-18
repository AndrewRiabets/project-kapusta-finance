import {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { getSummary } from '../../../redux/report/report-selectors';
import styles from './SummaryTable.module.css';

function SummaryTable({ type, title }) {
  const summary = useSelector(getSummary);
    
  const summaryReverse = [...summary].reverse();
  const filterSummaryCoast = summaryReverse.filter(el => el.costs.totalAmount !== undefined);
  const filterSummaryProfit = summaryReverse.filter(el => el.profit.totalAmount !== undefined);

    return (
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <th colSpan={2} className={styles.header}>{title}</th>
          </tr>
        </thead>
        {type === 'expense' && (
          <tbody className={styles.tableBody}>
            {filterSummaryCoast.map((month) => (
              <tr className={styles.tableRows} key={month.id}>
                <td className={styles.tableCell}>{month.description}</td> 
                <td className={styles.tableCell}>{month.costs.totalAmount}</td>
             </tr> 
            ))}
          </tbody>
        )}
         {type === 'income' && (
          <tbody className={styles.tableBody}>
            {filterSummaryProfit.map((month) => (
              <tr className={styles.tableRows} key={month.id}>
                <td className={styles.tableCell}>{month.description}</td> 
                <td className={styles.tableCell}>{month.profit.totalAmount}</td>
             </tr> 
            ))}
          </tbody>
        )}
      </table>
    )
}


export default SummaryTable;

