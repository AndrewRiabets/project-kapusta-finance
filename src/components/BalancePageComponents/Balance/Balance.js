import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import 'react-toastify/dist/ReactToastify.css';
import s from "../Balance/Balance.module.css";
import ModalBalance from "../ModalBalance";

import { useFetchResetBalanceMutation } from "../../../redux/services/transactionsAPI";
import { getAccessToken } from "../../../redux/auth/auth-selectors";
import * as actions from "../../../redux/finance/finance-actions";
import { getBalance } from "../../../redux/finance/finance-selectors";

export default function Balance({page}) {
  const balance = useSelector(getBalance);
  const [resBalance, setResBalance] = useState(null);
  const [notification, setNotification] = useState(false);
  const [valueInput, setValueInput] = useState('');
  const accessToken = useSelector(getAccessToken);
  const [fetchResetBalance] = useFetchResetBalanceMutation();
  const dispatch = useDispatch();

  const onHandleChange = e => {
    if (e.currentTarget.value.length === 0) {
      setResBalance(null);
      return
    };
    setValueInput(e.currentTarget.value);
    setResBalance(e.currentTarget.value);
  };
  
  useEffect(() => {
    setResBalance(balance);
  }, [balance, setResBalance]);

      
  const onClickApprove = useCallback(async (e) => {
    e.preventDefault();
    if (resBalance === null) {
      setNotification(true);
      toast.error('Пожалуйста, введите правильное значение!');
      setNotification(false);
      return
    };

  
    try {
      const newBalance = { balance: Number(resBalance) };
      const response = await fetchResetBalance({ accessToken, newBalance });
      dispatch(actions.balance(response.data.balance));
      setValueInput('');
      setNotification(true);
      toast.success('Баланс обновлен!');
      setNotification(false);
    } catch (error) {
      console.log(error);
    }
  }, [accessToken, dispatch, fetchResetBalance, resBalance]);


  return (
    <div className={s.container}>
      <div className={s.containerRight}>
        <h2 className={s.title}>
          Баланс:
        </h2>

        <form className={s.wrapperBalance}
          onSubmit={onClickApprove}
        >
          <div className={s.form}>
            <div className={s.wrapperBtn}>
              <input
              className={`${s.money} ${s.btn} ${page !== 'balance' && s.reportPageInput}`}
              name="nameBalance"
              disabled={page !== 'balance' && "disabled"}
              id="balanceId"
              type='text'
              value={valueInput}
              pattern="^\d*(\.\d{0,2})?$"
              title="Введите положительное число"
              required
              onChange={onHandleChange}
              placeholder={balance === null ? '00.00 грн.' : `${balance} грн.`}
              />
              <button
            className={`${s.confirm} ${s.btn} ${page !== 'balance' && s.reportPagedisplay}`}
            type="submit"
        >
            ПОДТВЕРДИТЬ
        </button>
            </div>
          </div>
        </form>
      </div>
      {balance <= 0 && <ModalBalance />}
      { <Toaster position="top-right" />}
    </div>
  );
}
