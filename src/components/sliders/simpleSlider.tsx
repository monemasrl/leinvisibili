import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/thumbs";
import "./simpleSlider.scss";
import Image from "next/image";

function SimpleSlider({ data, id }: { data: string[]; id: number }) {
  const [swiper, setSwiper] = useState<any>();
  useEffect(() => {
    swiper?.slideTo(id);
  }, [swiper]);
  return (
    <div>
      {" "}
      <Swiper
        navigation={true}
        modules={[Navigation]}
        loop={true}
        className="mySwiper"
        onSwiper={(swiper) => setSwiper(swiper)}
      >
        {data.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <Image
                src={"/image/" + item}
                width={900}
                height={450}
                alt="gallery"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default SimpleSlider;
