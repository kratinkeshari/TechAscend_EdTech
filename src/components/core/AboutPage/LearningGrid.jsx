import React from "react";
import HighlightText from "../../../components/core/Homepage/HighlightText";
import CTAButton from "../../../components/core/Homepage/Button";

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highliteText: "Anyone, Anywhere",
    description:
      "Techascend partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Techascend partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Techascend partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "Techascend partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Techascend partners with more than 275+ leading universities and companies to bring",
  },
];

const LearningGrid = () => {
  return (
<div className="grid mx-auto w-[95%] sm:w-[350px] xl:w-fit grid-cols-1 xl:grid-cols-4 mb-8 md:mb-12 gap-4 xl:gap-0">
      {LearningGridArray.map((card, i) => {
        return (
          <div
            key={i}
            className={`${i === 0 && "xl:col-span-2 xl:h-[294px]"}  ${
              card.order % 2 === 1
                ? "bg-richblack-700 h-auto xl:h-[294px]"
                : card.order % 2 === 0
                  ? "bg-richblack-800 h-auto xl:h-[294px]"
                  : "bg-transparent"
            } ${card.order === 3 && "xl:col-start-2"} rounded-lg xl:rounded-none`}
          >
            {card.order < 0 ? (
              <div className="w-full xl:w-[90%] flex flex-col gap-3 p-6 xl:pb-10 xl:pb-0">
                <div className="text-2xl md:text-3xl xl:text-4xl font-semibold text-white text-center xl:text-left">
                  {card.heading}
                  <HighlightText text={card.highliteText} />
                </div>
                <p className="text-richblack-300 font-medium text-sm md:text-base text-center xl:text-left">
                  {card.description}
                </p>

                <div className="w-fit mt-2 mx-auto xl:mx-0">
                  <CTAButton active={true} linkto={card.BtnLink}>
                    {card.BtnText}
                  </CTAButton>
                </div>
              </div>
            ) : (
              <div className="p-6 xl:p-8 flex flex-col gap-6 xl:gap-8 text-center xl:text-left">
                <h1 className="text-richblack-5 text-base md:text-lg">{card.heading}</h1>

                <p className="text-richblack-300 font-medium text-sm md:text-base">{card.description}</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  );
};

export default LearningGrid;
