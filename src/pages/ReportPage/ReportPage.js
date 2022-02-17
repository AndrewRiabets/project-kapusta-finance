import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ReportsBalance from "../../components/Reports/ReportsBalance";
import MultipleSlider from "../../components/Reports/MultipleSlider/MultipleSlider";
import CurrentPeriod from "../../components/Reports/CurrentPeriod/CurrentPeriod";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import Balance from "../../components/BalancePageComponents/Balance/Balance";
import { getSummary, getDate } from '../../redux/report/report-selectors';
import { getBalance } from "../../redux/finance/finance-selectors";
import * as actions from "../../redux/report/report-actions";
import style from "./ReportPage.module.css";
import s from "./bg.module.css";
import sprite from "../../Images/sprite.svg";

const ReportPage = () => {
  const viewPort = useWindowDimensions();
  const dispatch = useDispatch();

  const page='report'
  const balance = useSelector(getBalance);
  const summary = useSelector(getSummary);
  const reversedSummary = [...summary].reverse();
  const currentDate = reversedSummary[0].startDate;

   const sendDateInStore = useCallback(
     () => {
      dispatch(actions.date(currentDate))
    }, [currentDate, dispatch]
  );

  useEffect(() => {
    sendDateInStore()
  },[sendDateInStore, balance])
 
  return (
    <div className={s.bg_contaiter}>
      <div className={style.topWrapper}>
        <NavLink to="/balance" className={style.report}>
          <svg className={style.icon}>
            <use href={sprite + "#arrow"} alt="Go back" />
          </svg>
          <p className={style.linkText}>
            {viewPort.width > 767 && "Вернуться на главную"}
          </p>
        </NavLink>
        <div className={style.mobWrapper}>
          <div className={style.balance}>
            <Balance page={page} />
          </div>
          <CurrentPeriod />
        </div>
      </div>

      <ReportsBalance />
      <div className={style.bottomWrapper}>
        <MultipleSlider />
      </div>
    </div>
  );
};

export default ReportPage;
