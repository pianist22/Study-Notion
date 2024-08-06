
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OTPInput from "react-otp-input";

import { sendOtp, signUp } from "../services/operations/authAPI";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

const VerifyEmail = ()=>{
    const {signupData,loading} = useSelector((state)=> state.auth);
    const dispatch = useDispatch();
    const [otp,setOtp] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        if(!signupData){
            navigate("/signUp");
        }
    },[])

    const {
        accountType,
        firstName,
        lastName,
        password,
        confirmPassword,
        email
    } = signupData;

    function submitHandler(event){
        event.preventDefault();
        dispatch(signUp(accountType,firstName,lastName,email,password,confirmPassword,otp,navigate));
    }
    return (
        <div>
            {
                loading?
                (
                    <div className="spinner"></div>
                )
                :
                (
                    <div className="flex flex-col h-screen mt-[-50px] text-pure-greys-5 justify-center  w-[25%] mx-auto gap-2">
                        <h1 className="text-2xl font-bold  font-inter ">Verify Email</h1>
                        <p>Verification Code has been sent to you on your email. Please enter the code below.</p>
                        <form onSubmit={submitHandler}>
                        <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />
                            <button type="submit" className="w-full text-richblack-800 bg-yellow-25 p-2 rounded-md mt-2">
                                Verify Email
                            </button>
                        </form>

                        <div className="flex flex-row justify-between">
                            <div >
                                <Link to="/login" className="flex items-center">
                                    <FaArrowLeft/>
                                    <p>Back to Login</p>
                                </Link>
                            </div> 

                            <button onClick={()=> dispatch(sendOtp(signupData.email,navigate))} className="text-blue-200">
                                Resend It
                            </button> 
                        </div>

                    </div>
                )
            }
        </div>
    );
}

export default VerifyEmail;