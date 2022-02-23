import Slider from "react-slick";
import { useEffect, useState } from 'react';
import SliderIncome from "../SliderIncome/SliderIncome";
import SliderExpences from "../SliderExpences/SliderExpences";
import Chart from "../Chart/Chart";
import styles from './MultipleSlider.module.css'

export default function MultipleSlider() {

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [nav3, setNav3] = useState(null);
   
    
  const settingsFirst = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.slider__big',
  };

  const settingsSecond = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    asNavFor: '.slider__first',
    centerPadding: '3px',

  };
  return (
      <>
        <div className={styles.container}>
            <Slider
          {...settingsFirst}
          className={styles.slider__first}
          asNavFor={nav3}
          ref={slider => setNav1(slider)}
        >
          <div className={styles.slider__item}>
            <h2 className={styles.slider__text}>Расходы</h2>
          </div>
          <div className={styles.slider__item}>
            <h2 className={styles.slider__text}>Доходы</h2>
          </div>
            </Slider>

            <Slider
          {...settingsSecond }
          className={styles.slider__big}
          asNavFor={nav1}
          ref={slider => setNav2(slider)}
        >
          <div className={styles.slider_big__item}>
            <SliderExpences/>
          </div>
          <div className={styles.slider_big__item}>
            <SliderIncome />
          </div>
        </Slider>
      </div>
       <Slider
          {...settingsSecond }
          className={styles.slider__big}
          asNavFor={nav2}
          ref={slider => setNav3(slider)}
        >
        <div className={styles.slider_big__item}>
          <Chart />
      
          </div>
        <div className={styles.slider_big__item}>
             <Chart/>
          </div>
      </Slider>
      </>
    )
}