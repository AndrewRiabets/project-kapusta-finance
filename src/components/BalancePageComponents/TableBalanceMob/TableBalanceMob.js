import { useState, useCallback } from 'react';
import { useDeleteTransactionMutation, useFetchAllTransactionsQuery } from '../../../redux/services/transactionsAPI';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTransaction } from "../../../redux/finance/finance-selectors";
import { getAccessToken } from "../../../redux/auth/auth-selectors";
import * as actions from "../../../redux/finance/finance-actions";
import Modal from '../../Multipurpose-modal/Multipurpose-modal';
import items from "./expenses.json";
import sprite from "../../../Images/sprite.svg";
import s from './TableBalanceMob.module.css';

const TableBalanceMob = () => {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [delTransactionId, setDelTransactionId] = useState('init');
  const transaction = useSelector(getAllTransaction);
  const accessToken = useSelector(getAccessToken);
  const [removeTransaction] = useDeleteTransactionMutation();

  const onOpenModal = useCallback((e) => {
    setShowModal(true);
    setDelTransactionId(e.currentTarget.dataset.id);
  },[delTransactionId])


  const onCloseModal = useCallback(() => {
    setShowModal(false);
  },[delTransactionId]);

  const handleDeleteTransaction = useCallback(async () => {
    try {
      const response = await removeTransaction({accessToken, delTransactionId});
      dispatch(actions.allTransaction(response.data.data));
      dispatch(actions.balance(response.data.total));
      onCloseModal();
    } catch (error) {
      console.log(error);
    }
}, [accessToken, delTransactionId, onCloseModal, removeTransaction]);


  return (
    <>
      <div className={s.tableBodyScroll}>
        <ul className={s.tableWrapper}>
          {transaction.map((el) => (
            <div className={s.tableRowContainer} key={el._id}>
              <li className={s.tableRow}>
                <div className={s.tableItemWrapper}>
                  <p className={s.tdDescr}>{el.description}</p>
                  <div className={s.dateCategoryWrapper}>
                    <p className={s.tdDate}>{el.dateTransaction.substr(0,10)}</p>
                    <p className={s.tdCtg}>{el.categoryName}</p>
                  </div>
                </div>
                <div className={s.tablesumWrapper}>
                  <p className={`${s.tdSum} ${
                      el.isProfit !== true && s.tdSumExpense
                    }`}
                  >
                    {el.isProfit === true
                      ? `${el.amount} грн.`
                      : `- ${el.amount} грн.`}
                  </p>
                </div>

                <button
                  className={s.deleteBtn}
                  type="button"
                  onClick={(e) => onOpenModal(e)}
                  data-id={el._id}
                >
                  <svg className={s.icon}>
                    <use href={sprite + "#delete"} alt="delete transaction" />
                  </svg>
                </button>
              </li>
            </div>
          ))}
        </ul>
        {showModal === true && (
          <Modal
            questionText="Вы уверены?"
            onClickApproved={handleDeleteTransaction}
            onClose={onCloseModal}
          />
        )}
      </div>
    </>
  );
};

export default TableBalanceMob;
