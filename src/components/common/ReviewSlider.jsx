import React, { useEffect, useState } from "react"
import ReactStars from "react-rating-stars-component"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "../../App.css"
// Icons
import { FaStar } from "react-icons/fa"
// Import required modules
import { Autoplay, FreeMode, Pagination } from "swiper"

import { apiConnector } from "../../services/apiconnector"
import { ratingsEndpoints } from "../../services/apis"

function ReviewSlider() {
const [reviews, setReviews] = useState([])
  const truncateWords = 15

  useEffect(() => {
    ;(async () => {
      const { data } = await apiConnector(
        "GET",
        ratingsEndpoints.REVIEWS_DETAILS_API
      )
      console.log(data.data);
      if (data?.success) {
        setReviews(data?.data)
      }
    })()
  }, [])

  // console.log(reviews)

  return (
<div className="text-white w-full">
      <div className="my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent">
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 15,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },

            1024: {
              slidesPerView: 3,
              spaceBetween: 25,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 25,
            },
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="w-full"
        >
          {reviews.map((review, i) => {
            return (
              <SwiperSlide key={i}>
                <div className="flex flex-col gap-3 bg-richblack-800 p-4 md:p-6 text-[14px] text-richblack-25 rounded-lg min-h-[150px] md:min-h-[180px]">
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        review?.userId?.image
                          ? review?.userId?.image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.userId?.firstname} ${review?.userId?.lastname}`
                      }
                      alt=""
                      className="h-8 w-8 md:h-9 md:w-9 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <h1 className="font-semibold text-richblack-5 text-sm md:text-base">{`${review?.userId?.firstname} ${review?.userId?.lastname}`}</h1>
                      <h2 className="text-[12px] font-medium text-richblack-500">{review?.courseId?.courseName}</h2>
                    </div>
                  </div>
                  <p className="font-medium text-richblack-25 text-xs md:text-sm leading-relaxed">
                    {review?.review.split(" ").length > truncateWords
                      ? `${review?.review.split(" ").slice(0, truncateWords).join(" ")} ...`
                      : `${review?.review}`}
                  </p>
                  <div className="flex items-center gap-2 mt-auto">
                    <h3 className="font-semibold text-yellow-100 text-sm md:text-base">{review.rating.toFixed(1)}</h3>
                    <ReactStars
                      count={5}
                      value={review.rating}
                      size={window.innerWidth < 768 ? 16 : 20}
                      edit={false}
                      activeColor="#ffd700"
                      emptyIcon={<i className="far fa-star"></i>}
                      halfIcon={<i className="fa fa-star-half-alt"></i>}
                      fullIcon={<i className="fa fa-star"></i>}
                      isHalf={true}
                    />
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
    </div>
  )
}

export default ReviewSlider
