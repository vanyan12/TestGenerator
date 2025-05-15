import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


import '../index.css';

// import required modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

export default function App() {
  return (
    <>
      <Swiper 
        navigation={true} 
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Navigation, Pagination, Autoplay]} 
        className="mySwiper"
        >
        <SwiperSlide>
            <img src="./Slide1.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img src="./Slide2.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img src="./Slide3.png" alt="" />
        </SwiperSlide>

      </Swiper>
    </>
  );
}
