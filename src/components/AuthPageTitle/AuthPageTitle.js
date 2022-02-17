import style from "./AuthPageTitle.module.css";
import kapustaTablet from "../../Images/Union_tablet.png";
import kapustaMobile from "../../Images/Union_mobile.png";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { rollIn } from "react-animations";
import styled, { keyframes } from 'styled-components';

const Rollin = styled.div`animation: 2s ${keyframes`${rollIn}`} `;

const AuthPageTitle = () => {
   
  const viewPort = useWindowDimensions();

  return (
    <div className={style.titleComponent}>
      {viewPort.width >= 220 && viewPort.width < 480 && (
        <>
          <div className={style.titleContainer}>
            <img
              src={kapustaMobile}
              className={style.kapusta_title}
              alt="kapustaMobile"
            />
            <h2 className={style.title}>Smart Finance</h2>
          </div>
        </>
      )}
      {viewPort.width >= 480 && viewPort.width < 768 && (
        <>
          <div className={style.titleContainer}>
            <img
              src={kapustaTablet}
              className={style.kapusta_title}
              alt="kapustaMobile"
            />
            <h2 className={style.title}>Smart Finance</h2>
          </div>
        </>
      )}
      {viewPort.width >= 768 && (
        <>
          <div className={style.titleContainer}>
            <div className={style.titleItems}>
              <Rollin><h1 className={style.mainTitle}>Kapu$ta</h1></Rollin>
              <Rollin><h2 className={style.title}>Smart Finance</h2></Rollin>
              
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AuthPageTitle;