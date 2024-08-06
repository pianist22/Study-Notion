


import React from "react";
import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
import PublishCourse from "../AddCourse/PublishCourse"

const RenderSteps = ()=>{
    const {step} = useSelector((state)=>state.course);

    const steps = [
        {
            id:1,
            title: "Course Information",
        },
        {
            id:2,
            title: "Course Builder",
        },
        {
            id:3,
            title: "Publish",
        },
    ]
    return(
        <>
            <div className="flex gap-12 translate-x-[45px]">
            {
                steps.map((item)=>(
                    <div key={item.id}> 
                            <div className={`${step === item.id? "bg-yellow-900   lg:w-[50px] h-[50px] rounded-[50%] flex items-center justify-center  border-4 border-yellow-50 text-yellow-50" 
                            : "border-richblack-700 rounded-[50%] flex items-center justify-center  bg-richblack-800 w-[50px] h-[50px] text-richblack-300"}`}>
                            {
                                step>item.id? (<FaCheck className="bg-yellow-50 text-richblack-800 rounded-[50%] h-[50px] w-[50px]" fontSize={20}/>):(item.id)
                            }
                        </div>
                        {/* add code for dashes between the label */}
                        { 
                            item.id !== 3?
                            (
                                <div className="border-dashed border-2 w-[145px] border-richblack-300 translate-y-[-30px] translate-x-[50px]"></div>
                            ):
                            (
                                <div></div>
                            )
                        }
                    </div>
                ))
            }
            </div>
            <div className="flex gap-[6rem] items-center justify-center mb-12">
            {
                steps.map((item)=>(
                    <div key={item.id}>
                        {item.title}
                    </div>
                ))
            }
            </div>
            {step === 1 && <CourseInformationForm/>}
            {step === 2 && <CourseBuilderForm/>} 
            {step === 3 && <PublishCourse/>}
        </>
    )
}

export default RenderSteps