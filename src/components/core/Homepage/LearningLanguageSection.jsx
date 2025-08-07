import React from 'react';
import HighlightText from './HighlightText';
import kyp from '../../../assets/Images/Know_your_progress.png';
import cwo from '../../../assets/Images/Compare_with_others.png';
import pyl from '../../../assets/Images/Plan_your_lessons.png';
import CTAButton from '../../../components/core/Homepage/Button';

function LearningLanguageSection() {
  return (
    <div>
         <div className='flex flex-col gap-5 items-center'>
            <div className='text-4xl font-semibold text-center my-10'>
                Your Swiss Knife for 
                <HighlightText text={`learning any language `}/>
            </div>
            <div className='text-center text-richblack-700 mx-auto text-base mt-3 font-medium lg:w-[75%] leading-6'>
                Using spin making learning multiples languages easy, with 20+ languages realistic voice-over, progess tracking, custom schedule and more.
            </div>
            <div className='flex flex-col lg:flex-row items-center justify-center mt-8 lg:mt-0'>
                <img src={kyp} className='object-contain lg:-mr-32'/>
                <img src={cwo} className='object-contain lg:-mb-10 lg:-mt-0 -mt-12'/>
                <img src={pyl} className='object-contain lg:-ml-36 lg:-mt-5 -mt-16'/>
            </div>
            <div className='w-fit mx-auto lg:mb-20 mb-8 -mt-5'>
                <CTAButton linkto={'/signup'} active={true}>Learn More</CTAButton>
            </div>
         </div>
    </div>
  )
}

export default LearningLanguageSection