import { useSelector } from "react-redux";
import { getCategoryCosts } from "../../../redux/report/report-selectors";
import SliderExpencesList from "./SliderExpencesList";
import SliderNotification from "../SliderNotification/SliderNotification";

export default function SliderIncome() {
  const costs = useSelector(getCategoryCosts);

  return costs.length > 0 ? (
    <SliderExpencesList data={costs} />
  ) : (
    <SliderNotification operation={"расходов:)"} />
  );
}
