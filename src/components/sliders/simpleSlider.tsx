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

function SimpleSlider({
  immagini,
  data,
  opereAutrici,
  id,
}: {
  immagini: { [key: number]: string };
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
          const idAutrice = opereAutrici?.find((opera) => {
            return item.autrice[0] === opera.id;
          });

          return (
            <SwiperSlide key={index}>
              {item.autrice[0] && (
                <Image
                  src={
                    process.env.NEXT_PUBLIC_ASSETS_URL +
                    immagini[idAutrice?.autrici_id || 0]
                  }
                  width={500}
                  height={500}
                  alt={item.titolo}
                />
              )}

              {item.titolo}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default SimpleSlider;
