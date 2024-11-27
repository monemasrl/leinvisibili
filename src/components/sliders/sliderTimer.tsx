"use client";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/thumbs";
import "./sliderTimer.scss";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Autoplay } from "swiper/modules";
import { FreeMode, Navigation, Thumbs, EffectFade } from "swiper/modules";
import Image from "next/image";

type Tdata = {
  image: string;
  titolo?: string;
  testo?: string;
  action_label?: string;
  action_url?: string;
};
const TIMER = 10000;

function SliderName({
  titolo,
  isChangeSlider,
  currentSlide,
  setCurrentSlide,
  currentIndex,
}: {
  titolo: string;
  isChangeSlider: boolean;
  currentSlide: number;
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
  currentIndex: number;
}) {
  const [slideThumbBar, setSlideThumbBar] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      /* al cambio di slide setta la dimensione a zero */
      if (isChangeSlider) setSlideThumbBar(0);
      /* Quando è finita la transizione in entrata, slideThumbar è 0, parte la barra */ else {
        if (slideThumbBar < 100) {
          let size = slideThumbBar + 0.1;
          setSlideThumbBar(size);
        }
      }
    }, TIMER / 1200);
    return () => clearInterval(interval);
  });

  return (
    <>
      <div
        className="sliderProgressBar"
        style={{
          width: `${currentIndex === currentSlide ? slideThumbBar : 0}%`,
          height: 3,
        }}
      >
        {" "}
      </div>
      <div>{titolo}</div>
    </>
  );
}

function Slider({ data }: { data: Tdata[] }) {
  SwiperCore.use([Autoplay]);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isChangeSlider, setIsChangeSlider] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  if (data.length === 0) {
    return <h2>Error, no Slides!</h2>;
  }

  return (
    <>
      <Swiper
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, EffectFade]}
        autoplay={{ delay: TIMER }}
        className="mySwiper2"
        effect="fade"
        onSlideChangeTransitionEnd={() => {
          setIsChangeSlider(false);
        }}
        onActiveIndexChange={(swiper: {
          realIndex: React.SetStateAction<number>;
        }) => {
          setCurrentSlide(swiper.realIndex);
          setIsChangeSlider(true);
        }}
      >
        {data.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              {item.image && (
                <div className="wrapperSliderImage">
                  <Image
                    src={item.image}
                    alt={item.titolo || "immagine slider"}
                    fill
                    objectFit="cover"
                  />
                </div>
              )}
              {item.testo && (
                <div className="sliderContent">
                  <div
                    className="sliderContent__box"
                    dangerouslySetInnerHTML={{ __html: item.testo }}
                  />
                  {item.action_url && (
                    <a
                      href={item.action_url}
                      title={item.action_label}
                      className="buttonLink"
                    >
                      &#62;
                    </a>
                  )}
                </div>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper
        onSwiper={() => setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiperNav"
      >
        {data.map((item, index) => {
          /* Se non esiste una traduzione ritorna slide vuota */
          if (data.length === 0) return <div key={index}></div>;

          return (
            <SwiperSlide key={index}>
              <SliderName
                titolo={item.titolo || ""}
                isChangeSlider={isChangeSlider}
                currentSlide={currentSlide}
                setCurrentSlide={setCurrentSlide}
                currentIndex={index}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

export default Slider;
