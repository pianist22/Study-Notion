import React from "react";
import CTAButton from "./CTAButton";
import HighlightText from "./HighlightText";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

const CodeBlocks = ({
    position,heading,subheading,ctabtn1,ctabtn2,codeblock,codeColor
})=>{

    return (
    <div className={`flex ${position} lg:flex-row my-20 justify-between flex-col lg:gap-10`}>
        {/*Section 1*/}
        <div className='w-[90%] lg:w-[65%] flex flex-col gap-8'>
            {heading}
            <div className='text-richblack-300 font-bold '>
                {subheading}
            </div>

            <div className='flex gap-7 mt-7 lg:mx-5 sm:mx-auto '>
                <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                    <div className='flex gap-2 items-center'>
                        {ctabtn1.btnText}
                        <FaArrowRight/>
                    </div>
                </CTAButton>

                <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>  
                        {ctabtn2.btnText}
                </CTAButton>
            </div>
        </div>

        {/* Section-2 */}
        <div className="h-fit flex flex-row text-[18px] w-[100%] py-4 lg:w-[500px] border-2 border-transparent shadow-2xl shadow-blue-500/20 gradient">
            {/* HW-> Bg- gradient */}
           

            <div className="flex flex-col text-center w-[10%] text-richblack-400 font-inter font-bold ">
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
                <p>12</p>
            </div>
            <div className={`flex flex-col w-[75%] ${codeColor} font-bold font-mono pr-2 gap-2 text-base`}>
                <TypeAnimation
                    sequence={[codeblock,5000,""]}
                    repeat={Infinity}
                    cursor={true}
                    style={
                        {
                            whiteSpace:"pre-line",
                            display:"block",
                            
                        }
                    }
                    omitDeletionAnimation={true}
                    />
            </div>
        </div>

    </div>
    );
}

export default CodeBlocks;