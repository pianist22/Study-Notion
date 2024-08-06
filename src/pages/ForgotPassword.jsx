import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getPasswordResetToken } from "../services/operations/authAPI";
import { setLoading } from "../slices/authSlice";

const ForgotPassword = ()=>{
    const {loading} = useSelector((state)=> state.auth);
    
    const [emailSent,setEmailSent] = useState(false);
    const [email,setEmail] = useState("");
    const dispatch = useDispatch();

    function submitHandler(event){
        event.preventDefault();
        dispatch(getPasswordResetToken(email,setEmailSent));
    }

    return (
        <div>
            {
                loading?
                (
                    <div className="mt-[80px] mx-auto  spinner">
                    </div> 
                ):
                (
                    <div className="mt-[-50px] flex flex-col w-[25%] h-screen justify-center mx-auto gap-2 text-white">
                        <h1 className="text-2xl font-bold ">
                            {
                                !emailSent ? "Reset Your Password":"Check your Email"
                            }
                        </h1>

                        <p>
                            {
                                !emailSent?
                                "Have no fear, we will email you the instructions to reset your password. If you don't have access to your email we will try account recovery."
                                :
                                `We have sent you reset your password email to ${email}`
                            }
                        </p>

                        <form onSubmit={submitHandler} className="flex flex-col mt-2">
                            {
                                !emailSent && (
                                    <label>
                                        <p>Email Address <sup className="text-pink-200">*</sup></p>
                                        <input
                                        type="email"
                                        required
                                        value={email}
                                        name="email"
                                        onChange={(e)=> setEmail(e.target.value)}
                                        placeholder="Enter your Email Address"
                                        className="w-full px-2 py-2 bg-richblack-700 rounded-md mb-2" 
                                        />

                                    </label>
                                )
                            }

                            <button type="submit" className="w-full px-2 py-2 bg-yellow-25 rounded-md text-richblack-800 mt-2 ">
                                {
                                    !emailSent ? "Reset your Password":"Resend Email"
                                }
                            </button>
                        </form>
                        <div >
                            <Link to="/login" className="flex items-center">
                                <FaArrowLeft/>
                                <p>Back to Login</p>
                            </Link>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ForgotPassword;