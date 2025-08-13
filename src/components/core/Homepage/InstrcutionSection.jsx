import React from 'react';
import Instructor from '../../../assets/Images/Instructor.png'
import HighlightText from './HighlightText';
import CTAButton from '../../core/Homepage/Button'
import { FaArrowRight } from 'react-icons/fa';

function InstrcutionSection() {
    return (
<div>

      <div className="flex flex-col lg:flex-row gap-10 md:gap-16 lg:gap-20 items-center px-4">

        <div className="w-full lg:w-[50%] flex justify-center">
          <img
            src={Instructor || "/placeholder.svg"}
            alt="Instructor"
            className="shadow-white shadow-[-10px_-10px_0_0] md:shadow-[-20px_-20px_0_0] w-full max-w-[400px] lg:max-w-none"
          />
        </div>

        <div className="w-full lg:w-[50%] flex flex-col gap-6 md:gap-8 lg:gap-10 text-center lg:text-left">

          <div className="text-2xl md:text-3xl lg:text-4xl font-semibold w-full lg:w-[50%]">
            Become an
            <HighlightText text={"Instructor"}></HighlightText>
          </div>

          <p className="font-medium text-sm md:text-[16px] text-center lg:text-justify w-full lg:w-[90%] text-richblack-300">
            Instructor from around the world teach millions of students on TechAscend. We provide the tools and skills
            to teach what you love.
          </p>

          <div className="w-fit mx-auto lg:mx-0">
            <CTAButton linkto={"/signup"} active={true}>
              <div className="flex flex-row gap-2 items-center justify-center">
                Start Learning Today
                <FaArrowRight />
              </div>
            </CTAButton>
          </div>
        </div>
      </div>
    </div>
    )
}

export default InstrcutionSection