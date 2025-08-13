import React from 'react';
import CTAButton from './Button';
import HighlightText from './HighlightText';
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';

function CodeBlocks({ position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColor }) {
    return (
<div className={`flex ${position} my-10 md:my-20 justify-between flex-col gap-10 lg:gap-10`}>
      <div className="w-[100%] lg:w-[50%] flex flex-col gap-6 md:gap-8">
        <div className="text-2xl md:text-3xl lg:text-4xl font-semibold">{heading}</div>
        <div className="text-richblack-300 font-bold text-sm md:text-base w-[95%] lg:w-[85%] -mt-3">{subheading}</div>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-7 mt-4 md:mt-7">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className="flex gap-2 items-center justify-center">
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>

          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            <div className="flex gap-2 items-center justify-center">
              {ctabtn2.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>
        </div>
      </div>

      <div className="h-fit code-border flex flex-row text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] py-3 lg:w-[470px] overflow-x-auto">
        {/* BG Gradient */}
        {backgroundGradient}
        <div className="flex flex-col text-center w-[10%] min-w-[30px] text-richblack-400 font-inter font-bold select-none">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>
        <div className={`flex flex-col text-left w-[90%] gap-2 font-bold font-mono ${codeColor} pr-1 overflow-x-auto`}>
          <TypeAnimation
            sequence={[codeblock, 1000, ""]}
            repeat={Number.POSITIVE_INFINITY}
            cursor={true}
            omitDeletionAnimation={true}
            style={{
              whiteSpace: "pre-line",
              display: "block",
              fontSize: "inherit",
            }}
          />
        </div>
      </div>
    </div>
    )
}

export default CodeBlocks 