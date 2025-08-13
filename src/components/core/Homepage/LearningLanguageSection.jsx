import React from 'react';
import HighlightText from './HighlightText';
import kyp from '../../../assets/Images/Know_your_progress.png';
import cwo from '../../../assets/Images/Compare_with_others.png';
import pyl from '../../../assets/Images/Plan_your_lessons.png';
import CTAButton from '../../../components/core/Homepage/Button';

function LearningLanguageSection() {
  return (
<div>

      <div className="flex flex-col gap-5 items-center px-4">

        <div className="text-2xl md:text-3xl lg:text-4xl font-semibold text-center my-6 md:my-10">
          Your Swiss Knife for
          <HighlightText text={`learning any language `} />
        </div>

        <div className="text-center text-richblack-700 mx-auto text-sm md:text-base mt-3 font-medium w-[95%] md:w-[85%] lg:w-[75%] leading-6">
          Using spin making learning multiples languages easy, with 20+ languages realistic voice-over, progess
          tracking, custom schedule and more.
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center mt-6 lg:mt-8 gap-4 md:gap-0">

          <img
            src={kyp || "/placeholder.svg"}
            className="object-contain w-full max-w-[280px] md:max-w-none md:w-auto lg:-mr-32"
            alt="Know your progress"
          />
          <img
            src={cwo || "/placeholder.svg"}
            className="object-contain w-full max-w-[280px] md:max-w-none md:w-auto lg:-mb-10 lg:-mt-0 -mt-6 md:-mt-12"
            alt="Compare with others"
          />
          <img
            src={pyl || "/placeholder.svg"}
            className="object-contain w-full max-w-[280px] md:max-w-none md:w-auto lg:-ml-36 lg:-mt-5 -mt-8 md:-mt-16"
            alt="Plan your lessons"
          />
        </div>

        <div className="w-fit mx-auto mb-8 lg:mb-20 mt-2 lg:-mt-5">
          <CTAButton linkto={"/signup"} active={true}>
            Learn More
          </CTAButton>
        </div>
      </div>
    </div>
  )
}

export default LearningLanguageSection