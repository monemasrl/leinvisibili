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
import type { tOpera, tOpereAutrici } from "@/type";
import Image from "next/image";
import Link from "next/link";
function SimpleSlider({
  dataAutriciFromOpere,
  data,
  opereAutrici,
  id,
}: {
  dataAutriciFromOpere: {
    [key: number]: { img: string; nome: string; cognome: string; slug: string };
  };
  opereAutrici: tOpereAutrici[] | undefined;
  data: tOpera[];
  id: number;
}) {
  const [swiper, setSwiper] = useState<any>();
  useEffect(() => {
    swiper?.slideTo(id);
  }, [swiper]);
  console.log(data, "data");
  return (
    <div>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        loop={true}
        className="mySwiper"
        onSwiper={(swiper) => setSwiper(swiper)}
      >
        {data.map((item, index) => {
          console.log(item.autrice, "immagini");
          console.log(opereAutrici, "opereautrici");

          /* trova l'id dell'autrice nella join opereautrici  */
          const idAutrice = opereAutrici?.find((opera) => {
            return item.autrice[0] === opera.id;
          });

          return (
            <SwiperSlide key={index}>
              {idAutrice?.autrici_id && (
                <Link
                  href={
                    "/autrici/" +
                    dataAutriciFromOpere[idAutrice?.autrici_id].slug
                  }
                >
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_ASSETS_URL +
                      dataAutriciFromOpere[idAutrice?.autrici_id || 0].img
                    }
                    width={500}
                    height={500}
                    alt={item.titolo}
                  />
                </Link>
              )}

              <div className="swiper__content">
                {idAutrice?.autrici_id && (
                  <div className="swiper__content__nome">
                    <Link
                      href={
                        "/autrici/" +
                        dataAutriciFromOpere[idAutrice?.autrici_id].slug
                      }
                    >
                      {dataAutriciFromOpere[idAutrice?.autrici_id].nome +
                        " " +
                        dataAutriciFromOpere[idAutrice?.autrici_id].cognome}
                    </Link>
                  </div>
                )}
                {item.citazioni && (
                  <div className="swiper__content__citazione">
                    "{item.citazioni[0].citazione}"
                  </div>
                )}
                <div className="swiper__content__titolo">{item.titolo}</div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default SimpleSlider;
