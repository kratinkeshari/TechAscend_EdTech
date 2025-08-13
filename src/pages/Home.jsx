import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import HighlightText from '../components/core/Homepage/HighlightText';
import CTAButton from '../components/core/Homepage/Button';
import Banner from '../assets/Images/banner.mp4';
import CodeBlocks from '../components/core/Homepage/CodeBlocks';
import TimelineSection from '../components/core/Homepage/TimelineSection';
import LearningLanguageSection from '../components/core/Homepage/LearningLanguageSection';
import InstrcutionSection from '../components/core/Homepage/InstrcutionSection';
import ExploreMore from '../components/core/Homepage/ExploreMore';
import CourseCard from '../components/core/Homepage/CourseCard';
import ReviewSlider from '../components/common/ReviewSlider';

function Home() {
    return (
    <div>

      <div className="relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between gap-6 md:gap-8 px-4">

        <Link to={"/signup"}>
          <div className="group mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit mt-8 md:mt-16 p-1 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] hover:drop-shadow-none">
            <div className="flex flex-row items-center gap-2 rounded-full px-6 md:px-10 py-2 md:py-[-5px] transition-all duration-200 group-hover:bg-blue-900">
              <p className="text-sm md:text-base">Become an Instructor</p>
              <FaArrowRight className="text-sm md:text-base" />
            </div>
          </div>
        </Link>


        <div className="text-center text-2xl md:text-3xl lg:text-4xl font-semibold mt-4 md:mt-7">
          Empower Your Future with
          <HighlightText text="Coding Skills" />
        </div>

        <div className="mt-2 md:-mt-3 w-[95%] md:w-[90%] text-center text-sm md:text-lg font-bold text-richblack-300">
          With our online coding courses, you can earn at your own pace, from anywhere in the world, and get access to a
          wealth of resourcces, including hands-on projects, quizzes, and personalized feedback from instructors.
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-7 mt-6 md:mt-8 w-full sm:w-auto">
          <CTAButton linkto="/signup" active={true}>
            Learn More
          </CTAButton>
          <CTAButton linkto="/login" active={false}>
            Book a Demo
          </CTAButton>
        </div>

        <div className="mx-3 my-4 md:my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200 w-full max-w-[800px]">
          <video className="shadow-[20px_20px_rgba(255,255,255)] w-full h-auto" muted loop autoPlay>
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        <div className="w-full">
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-2xl md:text-3xl lg:text-4xl font-semibold">
                Unlock Your
                <HighlightText text={"coding potential"}></HighlightText>
                with our online courses
              </div>
            }
            subheading={`Our courses are designed and taught by industry experts who have years of experience and are passionate about sharing their knowledge with you. `}
            ctabtn1={{
              btnText: "Try it Yourself",
              active: true,
              linkto: "/signup",
            }}
            ctabtn2={{
              btnText: "Learn more",
              active: false,
              linkto: "/login",
            }}
            codeblock={`<!DOCTYPE html>\n<html>\nhead><title>Example</\ntitle><linkrel="stylesheet" href="sty\nles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>\n/h1>\nnav><ahref="one/">One</\na><ahref="two/">Two</\na><ahref="three/">Three</a>\n/nav>`}
            codecolor={`text-yellow-25`}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
          />
        </div>

        <div className="w-full">
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="w-[100%] text-2xl md:text-3xl lg:text-4xl font-semibold lg:w-[50%]">
                Start
                <HighlightText text={"coding in seconds"}></HighlightText>
              </div>
            }
            subheading={`Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.`}
            ctabtn1={{
              btnText: "Continue Lesson",
              active: true,
              linkto: "/signup",
            }}
            ctabtn2={{
              btnText: "Learn more",
              active: false,
              linkto: "/login",
            }}
            codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
            codecolor={`text-white`}
            backgroundGradient={<div className="codeblock2 absolute"></div>}
          />
        </div>

        <ExploreMore />
      </div>


      <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[250px] md:h-[320px]">
          <div className="w-11/12 max-w-maxContent flex flex-col items-center gap-6 md:gap-8 justify-between mx-auto px-4">
            <div className="h-[100px] md:h-[150px]"></div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-7 text-white mt-4 lg:mt-8">
              <CTAButton linkto={`/signup`} active={true}>
                <div className="flex flex-row items-center gap-2 justify-center">
                  Explore Full Catalog
                  <FaArrowRight></FaArrowRight>
                </div>
              </CTAButton>
              <CTAButton linkto={`/signup`} active={false}>
                <div className="flex flex-row items-center gap-3 justify-center">Learn More</div>
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-6 md:gap-8 px-4">

          <div className="flex flex-col mb-8 md:mb-10 mt-[-80px] md:mt-[-100px] justify-between gap-6 md:gap-7 lg:mt-20 lg:flex-row lg:gap-0">

            <div className="text-2xl md:text-3xl lg:text-4xl font-semibold w-full lg:w-[45%] text-center lg:text-left">
              Get the skills you need for a
              <HighlightText text={`Job that is in demand`} />
            </div>

            <div className="flex flex-col gap-6 md:gap-8 lg:gap-10 w-full lg:w-[40%] items-center lg:items-start">
              <div className="text-sm md:text-[16px] text-center lg:text-left">
                The modern TechAscend is the dictates its own terms. Today, to be a competitive specialist requires more
                than professional skills.
              </div>
              <div>
                <CTAButton linkto={"/signup"} active={true}>
                  <div>Learn More</div>
                </CTAButton>
              </div>
            </div>
          </div>
          <TimelineSection />
          <LearningLanguageSection />
        </div>
      </div>

      <div className="relative w-11/12 mx-auto my-12 md:my-20 max-w-maxContent flex flex-col items-center justify-between gap-6 md:gap-8 bg-richblack-900 text-white px-4">
        <InstrcutionSection />

        <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-semibold mt-6 md:mt-8">
          Review from Other Learners
        </h2>
        {/* Review Slider Here */}
        <ReviewSlider />
      </div>
    </div>
    )
}

export default Home;