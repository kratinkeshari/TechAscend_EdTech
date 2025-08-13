import React, { useEffect, useState } from "react"
import {
  TiStarFullOutline,
  TiStarHalfOutline,
  TiStarOutline,
} from "react-icons/ti"

function RatingStars({ Review_Count, Star_Size }) {

  const [starCount, SetStarCount] = useState({
    full: 0,
    half: 0,
    empty: 0,
  })

    useEffect(() => {
    const wholeStars = Math.floor(Review_Count) || 0
    SetStarCount({
      full: wholeStars,
      half: Number.isInteger(Review_Count) ? 0 : 1,
      empty: Number.isInteger(Review_Count) ? 5 - wholeStars : 4 - wholeStars,
    })
  }, [Review_Count])

    const responsiveStarSize = Star_Size || (typeof window !== "undefined" && window.innerWidth < 768 ? 16 : 20)

  return (
<div className="flex items-center gap-1 flex-wrap">
      {[...new Array(starCount.full)].map((_, i) => {
        return (
          <TiStarFullOutline
            key={i}
            size={Star_Size || (window.innerWidth < 640 ? 16 : window.innerWidth < 1024 ? 18 : 20)}
            className="text-yellow-100"
          />
        )
      })}
      {[...new Array(starCount.half)].map((_, i) => {
        return (
          <TiStarHalfOutline
            key={i}
            size={Star_Size || (window.innerWidth < 640 ? 16 : window.innerWidth < 1024 ? 18 : 20)}
            className="text-yellow-100"
          />
        )
      })}
      {[...new Array(starCount.empty)].map((_, i) => {
        return (
          <TiStarOutline
            key={i}
            size={Star_Size || (window.innerWidth < 640 ? 16 : window.innerWidth < 1024 ? 18 : 20)}
            className="text-yellow-100"
          />
        )
      })}
    </div>
  )
}

export default RatingStars