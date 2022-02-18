import React from "react";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";

import Balance from "../../components/BalancePageComponents/Balance/Balance";
import GoToReports from "../../components/BalancePageComponents/GoToReport";
import Container from "../../components/Container/index";
import TransactionForm from "../../components/BalancePageComponents/TransactionForm/index";
import TableBalance from "../../components/BalancePageComponents/TableBalance/TableBalance";
import TableBalanceMob from "../../components/BalancePageComponents/TableBalanceMob/TableBalanceMob";
import SummaryTable from "../../components/BalancePageComponents/SummaryTable/index";
import useWindowDimensions from "../../hooks/useWindowDimensions";

import { useFetchAllTransactionsMutation } from "../../redux/services/transactionsAPI";
import { useFetchSummaryMutation } from '../../redux/services/reportAPI';

import { getAccessToken } from "../../redux/auth/auth-selectors";
import * as actions from "../../redux/finance/finance-actions";
import * as action from '../../redux/report/report-actions';

import s from "./BalancePage.module.css";
import sprite from "../../Images/sprite.svg";

const BalancePage = () => {
  const [type, setType] = useState("expense");
  const page = "balance";
  const [listRender, setListRender] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const viewPort = useWindowDimensions();
  const accessToken = useSelector(getAccessToken);
  const [fetchAllTransactions, {isLoading}] = useFetchAllTransactionsMutation();
  const [fetchSummary] = useFetchSummaryMutation();
  const dispatch = useDispatch();

  const sendDataInStore = useCallback(
    (response) => {
      dispatch(actions.balance(response.data.total))
      dispatch(actions.allTransaction(response.data.data))
    },
    [dispatch]
  );

  const sendSummaryInStore = useCallback(
    (response) => {
      dispatch(action.summary(response.data))
    }, [dispatch]
  );

  const getAllTransactions = useCallback(async () => {
    try {
      const response = await fetchAllTransactions(accessToken);
      sendDataInStore(response);
    } catch (error) {
      console.log(error);
    }
  }, [accessToken, fetchAllTransactions, sendDataInStore]);

  const getSummaryReport = useCallback(async () => {
    try {
      const response = await fetchSummary({ accessToken });
      sendSummaryInStore(response);
    } catch (error) {
      console.log(error);
    }
  }, [accessToken, fetchSummary, sendSummaryInStore]);

  useEffect(() => {
      getAllTransactions();
      getSummaryReport();
  }, [getAllTransactions, getSummaryReport]);

  const btnTypeToggle = (e) => {
    setType(`${e.target.title}`);
  };

  const onBtnBack = (e) => {
    btnTypeToggle(e);
    return listRender ? setListRender(false) : setListRender(true);
  };

  return (
    <>
      <Container>
        {viewPort.width >= 768 && (
          <>
            <div className={s.balanceWrapper}>
              <Balance page={page} showModal={isLoading}/>
              <GoToReports />
            </div>
            <div className={s.buttons}>
              <button
                className={`${s.buttonExpense} ${
                  type === "expense" && s.buttonExpenseActive
                }`}
                onClick={btnTypeToggle}
                title="expense"
              >
                расход
              </button>
              <button
                className={`${s.buttonExpense} ${
                  type === "income" && s.buttonExpenseActive
                }`}
                onClick={btnTypeToggle}
                title="income"
              >
                доход
              </button>
            </div>
            {viewPort.width >= 768 && viewPort.width < 1280 && (
              <>
                <div className={s.transactionTableSummaryContainer}>
                  <TransactionForm type={type} />
                  <TableBalance type={type} />
                </div>

                <SummaryTable
                  type={type}
                  title="СВОДКА"
                  />
              </>
            )}
            {viewPort.width >= 1280 && (
              <div className={s.transactionTableSummaryContainer}>
                <TransactionForm type={type} />
                <div className={s.tableSummaryContainer}>
                  <TableBalance type={type} />

                  <SummaryTable
                    type={type}
                    title="СВОДКА"
                    />
                  
                </div>
              </div>
            )}
          </>
        )}
        {viewPort.width < 768 && (
          <>
            {listRender ? (
              <>
                <div className={s.balanceWrapper}>
                  <GoToReports />
                  <div className={s.balance}>
                    <Balance page={page} showModal={isLoading}/>
                  </div>
                </div>

                 <div className={s.calendarWrapper}>
                   <svg className={s.calendar}>
                       <use href={`${sprite}#calendar`}></use>
                   </svg>
                   <DatePicker
                     type="date"
                     locale="ru"
                     selected={selectedDate}
                     onChange={(date) => setSelectedDate(date)}
                     dateFormat="dd.MM.yyyy"
                     className={s.inputeDate}
                   />
                 </div>

                <TableBalanceMob id={type} />
                <div className={s.buttonsMob}>
                  <button
                    className={`${s.buttonExpenseMob} ${
                      type === "expense" && s.buttonExpenseActive
                    }`}
                    onClick={onBtnBack}
                    title="expense"
                  >
                    расход
                  </button>
                  <button
                    className={`${s.buttonExpenseMob} ${
                      type === "income" && s.buttonExpenseActive
                    }`}
                    onClick={onBtnBack}
                    title="income"
                  >
                    доход
                  </button>
                </div>
              </>
            ) : (
              <>
                <button className={s.buttonGoBack} onClick={onBtnBack}>
                  <svg className={s.icon}>
                    <use href={sprite + "#arrow"} alt="Go back" />
                  </svg>
                </button>
                <TransactionForm type={type} />
              </>
            )}
          </>
        )}
      </Container>
    </>
  );
};
export default BalancePage;
