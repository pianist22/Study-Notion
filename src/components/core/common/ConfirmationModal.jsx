import React from "react";
import IconBtn from "./IconBtn";
// import { closeModal } from "../../../hooks/modal";

const ConfirmationModal = ({modalData})=>{
    return (
        <div className="h-screen md:top-20 ">
            <div className="absolute items-center modal flex flex-col gap-3 bg-richblack-800 rounded-md py-4 px-5 transition-all duration-200  hover:shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]">
                <h1 className="text-3xl font-semibold text-white">
                    {modalData.text1}
                </h1>
                <p className="text-richblack-300">
                    {modalData.text2}
                </p>
                <div className="flex gap-4">
                    <div className="bg-yellow-50 rounded-md p-2 text-black font-semibold">

                        <IconBtn
                        onclick={modalData?.btn1Handler}
                        text={modalData?.btn1Text}/>
                    </div>
                    <div className=" bg rounded-md p-2 bg-richblack-300 text-black font-semibold">

                        <IconBtn
                        onclick={modalData?.btn2Handler}
                        text={modalData?.btn2Text} className="bg-richblack-300 p-2 rounded-md"/>
                    </div>
                </div>
            </div>
            <div class="overlay"></div>
        </div>
    )
}

export default ConfirmationModal