import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import ru from "date-fns/locale/ru";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { getAccessToken } from "../../../redux/auth/auth-selectors";
import * as actions from "../../../redux/finance/finance-actions";
import * as action from '../../../redux/report/report-actions';
import { useAddTransactionMutation } from "../../../redux/services/transactionsAPI";
import { useFetchSummaryMutation } from '../../../redux/services/reportAPI';

import categoryName from "../../../helpers/categoryList";
import DropDownList from "../DropDownList/DropDownList";
import style from "./TransitionForm.module.css";
import sprite from "../../../Images/sprite.svg";

registerLocale("ru", ru);

const FormSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  categories: Yup.string().required("Required"),
  value: Yup.number().min(2).positive().required("Required"),
});

function TransactionForm({ type }) {
  const accessToken = useSelector(getAccessToken);
  const [addTransaction] = useAddTransactionMutation();
  const [fetchSummary] = useFetchSummaryMutation();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [placeholderCategories, setPlaceholderCategories] = useState("");
  const viewPort = useWindowDimensions();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(FormSchema),
  });

  const getDate = (newdata) => {
    setSelectedDate(newdata);
  };

  const postNewTransactions = useCallback(
    async (newTransaction) => {
      try {
        const response = await addTransaction({ accessToken, newTransaction });
        const resp = await fetchSummary({ accessToken });
        dispatch(actions.allTransaction(response.data.data));
        dispatch(actions.balance(response.data.total));
        dispatch(action.summary(resp.data));
      } catch (error) {
        console.log(error);
      }
    },
    [accessToken, addTransaction, dispatch]
  );

  useEffect(() => {
    getDate(selectedDate);

    setValue("date", selectedDate);
  }, [selectedDate, setValue]);

  useEffect(() => {
    const checkClick = (e) => {
      if (open) {
        setOpen(false);
      }
    };
    document.addEventListener("click", checkClick);
    return () => {
      document.removeEventListener("click", checkClick);
    };
  }, [open]);

  const onSubmit = async (data) => {
    const { date, name, value, categories } = data;
    const categoryID = categoryName
      .filter((data) => data.label === categories)
      .map((el) => el._id);

    const dataTransaction = {
      categoryId: categoryID[0],
      categoryName: categories,
      dateTransaction: date.toISOString(),
      description: name,
      amount: value,
      isProfit: type === "expense" ? false : true,
    };

    postNewTransactions(dataTransaction);

    reset({
      name: "",
      categories: "",
      value: "",
    });
  };

  const clearForm = () => {
    resetField("value");
    resetField("name");
    resetField("categories");
  };

  const changerPlaceholder = (value) => {
    setPlaceholderCategories(value);
    setOpen(false);
  };

  useEffect(() => {
    setValue("categories", placeholderCategories);
  }, [placeholderCategories, setValue]);

  return (
    <div className={style.allContainer}>
      <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.inputContainer}>
          <div className={style.calendarTransactionForm}>
            <div className={style.formContainer}>
              {viewPort.width >= 768 && (
                <>
                  <svg className={style.calendar}>
                    <use href={`${sprite}#calendar`}></use>
                  </svg>
                  <DatePicker
                    {...register("date")}
                    type="date"
                    locale="ru"
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="dd.MM.yyyy"
                    // maxDate={new Date()}
                    className={style.inputeDate}
                  />
                </>
              )}
            </div>

            <div className={style.inputTransactionContainer}>
              <div className={style.inputWrapper}>
                <input
                  className={style.input}
                  placeholder={
                    type === "expense" ? "Описание товара" : "Описание дохода"
                  }
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <p className={style.errors}>Обязательное поле</p>
                )}
              </div>
              <div className={style.categoryArrowContainer}>
                <div className={style.category}>
                  <input
                    className={style.inputCategoty}
                    readOnly
                    onClick={() => setOpen(!open)}
                    placeholder={
                      type === "expense"
                        ? "Категория товара"
                        : "Категория дохода"
                    }
                    {...register("categories", { required: true })}
                  />
                </div>
                {errors.categories && (
                  <p className={style.errors}>Обязательное поле</p>
                )}
                {open ? (
                  <div className={style.icon}>
                    <svg className={style.arrowUp}>
                      <use href={`${sprite}#arrow`}></use>
                    </svg>
                  </div>
                ) : (
                  <div className={style.icon}>
                    <svg className={style.arrowDown}>
                      <use href={`${sprite}#arrow`}></use>
                    </svg>
                  </div>
                )}
              </div>
              {open && (
                <DropDownList
                  type={type}
                  options={categoryName}
                  changerDescription={changerPlaceholder}
                />
              )}

              <div className={style.valueContainer}>
                <input
                  placeholder={viewPort.width >= 768 ? "0,00" : "00,00 UAH"}
                  className={style.inputValue}
                  {...register("value", { required: true })}
                />
                {errors.value && (
                  <p className={style.errors}>Обязательное поле</p>
                )}
                <svg className={style.calculator}>
                  <use href={`${sprite}#calculator`}></use>
                </svg>
              </div>
            </div>
          </div>
          <div className={style.btnContainer}>
            <button type="submit" className={style.formBtn}>
              Ввод
            </button>
            <button type="button" className={style.formBtn} onClick={clearForm}>
              Очистить
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default TransactionForm;
