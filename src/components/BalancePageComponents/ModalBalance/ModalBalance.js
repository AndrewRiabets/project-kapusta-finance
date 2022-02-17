import s from '../ModalBalance/ModalBalance.module.css';

export default function ModalBalance() {
    return (
        <div className={s.modal_balance}>
            <p className={s.modal_first_info}>
                {"Привет! Для начала работы внеси текущий баланс своего счета!"}
            </p>
            <p className={s.modal_second_info}>
                {"Ты не можешь тратить деньги пока их у тебя нет :)"}
            </p>
        </div>
    )
}

