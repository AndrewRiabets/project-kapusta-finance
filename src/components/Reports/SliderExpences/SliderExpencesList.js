import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFetchCategoryItemsMutation } from "../../../redux/services/reportAPI";
import { getAccessToken } from "../../../redux/auth/auth-selectors";
import { getDate } from "../../../redux/report/report-selectors";
import * as actions from "../../../redux/report/report-actions";
import sprite from "../../../Images/sprite.svg";
import style from "./SliderExpences.module.css";
import { getActive } from "../../../redux/report/report-selectors";

export default function SliderExpencesList({ data }) {
  const accessToken = useSelector(getAccessToken);
  const getActiveState = useSelector(getActive);
  const dispatch = useDispatch();
  const date = useSelector(getDate);
  const [fetchCategoryItems] = useFetchCategoryItemsMutation();

  const sendDataInStore = useCallback(
    (response) => {
      dispatch(actions.categoryItems(response.data));
    },
    [dispatch]
  );

  const getItems = useCallback(
    async ({ categoryId, date }) => {
      try {
        const response = await fetchCategoryItems({
          accessToken,
          categoryId,
          date,
        });

        sendDataInStore(response);
      } catch (error) {
        console.log(error);
      }
    },
    [accessToken, fetchCategoryItems, sendDataInStore]
  );

  const handleClick = (e) => {
    dispatch(actions.active(e.currentTarget.dataset.index));
  };

  return (
    <ul className={style.expencesList}>
      {data.map(({ _id: { categoryId, categoryName }, totalAmount }) => {
        return (
          <li key={categoryId} className={style.expencesItem}>
            <p className={style.amount}>{totalAmount}</p>
            <div
              className={style.iconWrapper}
              onClick={() => getItems({ categoryId, date })}
            >
              <svg
                data-index={categoryId}
                className={
                  categoryId === getActiveState
                    ? `${style.active}`
                    : `${style.icon}`
                }
                onClick={handleClick}
              >
                <use href={sprite + `#${categoryName}`} alt="My logo" />
              </svg>
            </div>
            <p className={style.expencesType}>{categoryName}</p>
          </li>
        );
      })}
    </ul>
  );
}
