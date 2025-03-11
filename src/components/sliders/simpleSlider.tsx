"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/thumbs";
import "./simpleSlider.scss";
import type {
  tCitazioni,
  tOpera,
  tOpereAutrici,
  tAutrice,
  tAutriciCitazioni,
} from "@/type";

import Link from "next/link";
import ImagePreload from "../loaders/imagePreLoad";
function getdata(
  idOpera: number,
  id: number,
  autrici: tAutrice[],
  opere: tOpera[],
  opereAutrici: tOpereAutrici[] | undefined,
  autriciCitazioni: tAutriciCitazioni[] | undefined
) {
  /* trova l'opera della citazione tra la collection opere */
  const opera = opere.find((opera) => opera.id === idOpera);
  /* trova l'ID dell'autrice nella tabella di relazione opereAutrici */

  const idAutrice = autriciCitazioni?.find((item) => item.item === String(id));

  /* trova i dati dell'autrice nella tebella autrici */
  if (idAutrice) {
    const autrice = autrici.find(
      (autrice) => autrice.id === idAutrice.autrici_id
    );

    return { autrice: autrice, opera: opera };
  }
}
function SimpleSlider({
  data,
  opereAutrici,
  autriciCitazioni,
  autrici,
  opere,
  id,
}: {
  autrici: tAutrice[];
  opereAutrici: tOpereAutrici[] | undefined;
  data: tCitazioni[];
  autriciCitazioni: tAutriciCitazioni[] | undefined;
  opere: tOpera[];
  id: number;
}) {
  const [swiper, setSwiper] = useState<any>();
  useEffect(() => {
    swiper?.slideTo(id);
  }, [swiper]);

  return (
    <div className="swiper__container">
      <Swiper
        navigation={true}
        modules={[Navigation]}
        loop={true}
        className="mySwiper"
        onSwiper={(swiper) => setSwiper(swiper)}
        speed={1000}
      >
        {data.map((item, index) => {
          const mainData = getdata(
            item.opera,
            item.id,
            autrici,
            opere,
            opereAutrici,
            autriciCitazioni
          );

          return (
            <SwiperSlide key={index}>
              {mainData?.autrice?.id && (
                <Link href={"/autrici/" + mainData?.autrice?.slug}>
                  <ImagePreload
                    src={
                      process.env.NEXT_PUBLIC_ASSETS_URL +
                      mainData?.autrice?.immagine_principale
                    }
                    width={500}
                    height={500}
                    alt={"item.titolo"}
                    type="fixed"
                    isLazy={true}
                  />
                </Link>
              )}

              <div className="swiper__content">
                {mainData?.autrice?.id && (
                  <div className="swiper__content__nome">
                    <Link href={"/autrici/" + mainData?.autrice?.slug}>
                      {mainData?.autrice?.nome +
                        " " +
                        mainData?.autrice?.cognome}
                    </Link>
                  </div>
                )}
                {item.citazione && (
                  <div
                    className="swiper__content__citazione"
                    dangerouslySetInnerHTML={{ __html: item.citazione }}
                  />
                )}
                <div className="swiper__content__titolo">
                  {mainData?.opera?.titolo}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default SimpleSlider;
