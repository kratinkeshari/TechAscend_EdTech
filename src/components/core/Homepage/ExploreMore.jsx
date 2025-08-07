import React from 'react';
import { useState } from 'react';
import {HomePageExplore} from '../../../data/homepage-explore';
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';

const tabsName = ["Free", "New to coding", "Most popular", "Skills paths", "Career paths"];

function ExploreMore() {
    const [currentTab,setCurrentTab] = useState(tabsName[0]);
    const [courses,setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard,setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter( (course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }

  return (
    <div>
        <div>
        <div className='text-4xl font-semibold text-center my-10'>
            Unlock the
            <HighlightText text={`Power of Code`}></HighlightText>
            <p className='text-center text-richblack-300 text-sm text-[16px] mt-3'>Learn to build anything you can imagine</p>
        </div>
        </div>

        

        <div className='hidden lg:flex lg:flex-row gap-5 -mt-5 mx-auto w-max rounded-full text-richblack-200 bg-richblack-800 p-1 font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]'>
            {
                tabsName.map( (element,index) => {
                    return (
                        <div className={`text-[16px] flex flex-row items-center gap-2 
                        ${currentTab === element ? "bg-richblack-900 text-richblack-5 font-medium" : "text-richblack-200"}
                        rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2 `}
                        key={index}
                        onClick={() => setMyCards(element)}>
                            {element}
                        </div>
                    )
                })
            }
        </div>
        
        <div className='hidden lg:block lg:h-[200px]'>
            <div className='lg:absolute flex flex-row gap-10 lg:gap-0 justify-center lg:justify-between w-full flex-wrap lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3'>
                {
                    courses.map( (element,index) => {
                        return(
                           <CourseCard
                           key={index}
                           cardData = {element}
                           currentCard = {currentCard}
                           setCurrentCard = {setCurrentCard}
                           /> 
                        )
                    })
                }
            </div>
        </div>

    </div>
  )
}

export default ExploreMore