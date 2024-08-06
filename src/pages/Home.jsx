

import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/core/Homepage/HighlightText";
import CTAButton from "../components/core/Homepage/CTAButton";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/Homepage/CodeBlocks";
import TimeLineSection from "../components/core/Homepage/TimeLineSection";
import LearningLaguageSection from "../components/core/Homepage/LearningLaguageSection";
import InstructorSection from "../components/core/Homepage/InstructorSection";
import ExploreMore from "../components/core/Homepage/ExploreMore";
import TextColor from "../components/core/Homepage/TextColor";
import { TypeAnimation } from "react-type-animation";
import Footer from "../components/core/common/Footer";
import ReviewSlider from "../components/core/common/ReviewSlider";
const Home = ()=>{
    const str= "Coding Skills";
    return (
        <div>
            {/* Section -1 */}
            <div className=" mt-10 relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between">
                <Link to="/signUp">
                    <div className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit hover:shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]">
                        <div className="flex flex-row items-center rounded-full px-7 py-[5px] gap-2 transition-all duration-200 group-hover:bg-richblack-900">
                            <p>Become an Instructor</p>
                            <FaArrowRight/>
                        </div>
                    </div>
                </Link>
                <div className="text-center text-4xl font-semibold mt-8 w-[100%]">
                    Empower Your Future With <span>
                        <TypeAnimation  className="color font-italic"
                                        sequence={[str,6000,""]}
                                        repeat={Infinity}
                                        cursor={true}
                                        style={
                                            {
                                                whiteSpace:"pre-line",
                                                display:"block",
                                            }
                                        }
                    />
                    </span>
                </div>
                <div className="mt-4 w-[80%] text-center text-lg font-bold text-richblack-300">
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
                </div>
                <div className="flex flex-row gap-7 mt-8">
                    <CTAButton  active={true} linkto={"/signUp"}>
                        Learn More
                    </CTAButton>
                    <CTAButton active={false} linkto={"/login"}>
                        Book a Demo
                    </CTAButton>
                </div>
                <div className='mx-3 my-12 shadow-blue-200'>

                    <video className="w-[85%]   mx-auto transition-all duration-200  shadow-[14px_-10px_30px_4px_rgba(0,0,0,0.1),_14px_10px_30px_4px_rgba(45,78,255,0.15)]"
                    muted
                    loop
                    autoPlay
                    >
                    <source  src={Banner} type="video/mp4" />
                    </video>
            
                </div> 
                {/*Code Blocks*/}
                <div classname="w-[85%]">
                    <CodeBlocks className=" mx-auto "
                        position={'lg: flex-row'}
                        heading={
                            <div className="w-[100%] text-4xl font-semibold lg:w-[50%]">
                                Unlock your  
                                <HighlightText text={" coding potential "}/>
                                 with our online courses
                            </div>
                        }
                        subheading = {
                            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                        }
                        ctabtn1={
                            {
                                btnText: "Try it yourself",
                                linkto:"/signUp",
                                active:true,
                            }
                        }
                        ctabtn2={
                            {
                                btnText: "Learn more",
                                linkto:"/login",
                                active:false,
                            }
                        }
                        
                        codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n</nav>`
                        }
                        codeColor={"text-pink-600"}

                    />
                </div>

                <div classname="w-[85%]">
                    <CodeBlocks className=" mx-auto "
                        position={'lg: flex-row-reverse'}
                        heading={
                            <div className="w-[100%] text-4xl font-semibold lg:w-[50%]">
                                Unlock your  
                                <HighlightText text={" coding potential "}/>
                                 with our online courses
                            </div>
                        }
                        subheading = {
                            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                        }
                        ctabtn1={
                            {
                                btnText: "Try it yourself",
                                linkto:"/signUp",
                                active:true,
                            }
                        }
                        ctabtn2={
                            {
                                btnText: "Learn more",
                                linkto:"/login",
                                active:false,
                            }
                        }
                        codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</\na><ahref="three/">Three</a>\n</nav>`
                        }
                        codeColor={"text-pink-400"}

                    />
                </div>

                <ExploreMore/>
            </div>
            {/* Section -2 */}
            <div className="bg-pure-greys-5 text-richblack-700">
                <div className="homepage_bg h-[330px]">
                    <div className="w-11/12 max-w-maxContent flex flex-col items-center gap-5 mx-auto">
                        <div className="lg:h-[150px]"></div>
                        <div className="flex flex-row text-white gap-7 lg:mt-8">
                            <CTAButton active={true} linkto={"/signUp"}>
                                <div className="flex items-center gap-3">
                                    Explore Full Catalog 
                                    <FaArrowRight/>
                                </div>
                            </CTAButton>
                            <CTAButton active={false} linkto={"signUp"}>
                                <div>
                                    Learn more 
                                </div>
                            </CTAButton>
                        </div>
                    </div>
                </div>

                <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7 ">
                    <div className="flex md:flex-row flex-col items-center gap-10  mx-[20px] mb-10 mt-[95px]">
                        <div className="text-4xl font-semibold lg:w-[45%] ">
                            Get the skills you need for a 
                            <HighlightText text={" Job that is in Demand "}/>
                        </div>
                        <div className='flex flex-col gap-10 lg:w-[40%] items-start'>
                        <div className='text-[16px]'>
                        The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                        </div>
                        <CTAButton active={true} linkto={"/signUp"}>
                            <div>
                                Learn more
                            </div>
                        </CTAButton>
                        </div>
                    </div>
                    <TimeLineSection/>
                    <LearningLaguageSection/>
                </div>
            </div>

            {/* Section -3 */}

            <div className="w-11/12 max-w-maxContent mx-auto flex flex-col items-center justify-between gap-8 bg-richblack-900 text-white mb-10">
                <InstructorSection/>

                {/* Reviws from Other Learner
                <h1 className="text-center text-4xl font-semibold mt-8">
                Reviews from other learners
                </h1>
                <ReviewSlider /> */}
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default Home;