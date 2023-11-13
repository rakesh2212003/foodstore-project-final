import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useSelector } from 'react-redux';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/bundle'

import '../assets/css/swiperStyles.css'
import { SliderCard } from '../components'

const Slider = () => {

    const [fruits, setfruits] = useState(null)
    const products = useSelector(state => state.products)

    useEffect(() => {
        setfruits(products?.filter((item) => item.product_category === 'fruits'))
    }, [products])

    return (
        <div className='w-full pt-24'>
            <Swiper
                slidesPerView={4}
                centeredSlides={false}
                spaceBetween={30}
                grabCursor={true}
                className="mySwiper"
            >
                {fruits && fruits.map((data, i) => 
                    <SwiperSlide key={i}>
                        <SliderCard
                            key={i}
                            data={data}
                            index={i}
                        />
                    </SwiperSlide>
                )}
            </Swiper>
        </div>
    )
}

export default Slider