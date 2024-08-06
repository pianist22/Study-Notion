import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { resetPassword } from "../services/operations/authAPI";

const UpdatePassword = ()=>{
    const dispatch = useDispatch();
    const location = useLocation();

    const [formData,setFormData] = useState({
        password:"",
        confirmPassword:"",
    })
    const {loading} = useSelector((state)=> state.auth);
    const [showPassword,setShowPassword] = useState(false);
    const [showConfirmPassword,setShowConfirmPassword] = useState(false);

    function changeHandler(event){
        setFormData((prev)=>(
            {
                ...prev,
                [event.target.name]:event.target.value,
            }
        ))
    }
    const {password,confirmPassword} = formData;
    function submitHandler(event){
        event.preventDefault();
        const token = location.pathname.split("/").at(-1);
        dispatch(resetPassword(password,confirmPassword,token));

    }

    return (
        <div >
            {
                loading?
                (
                    <div className="spinner">
                    </div>
                )
                :
                (
                    <div className="flex flex-col h-screen mt-[-20px] text-pure-greys-5 justify-center  w-[25%] mx-auto gap-1">
                        <h1 className="text-2xl font-bold ">Choose new Password</h1>
                        <p className="text-pure-greys-5">Almost there,Enter your new password and you're all set</p>
                        <form onSubmit={submitHandler}>
                            <label className="relative  ">
                                <p className="mt-2 ">New Password</p>
                                <input
                                    type={
                                        showPassword? "text":"password"
                                    }
                                    name="password"
                                    value={password}
                                    onChange={changeHandler}
                                    placeholder="Enter new Password"
                                    className="text-pure-greys-5 bg-richblack-600 p-2 rounded-md w-full"
                                 />
                                <span
                                onClick={() => setShowPassword((prev) => !prev)} className="absolute translate-x-[-30px] translate-y-[10px]"
                                >
                                    {showPassword ? (
                                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                    ) : (
                                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                    )}
                                </span>
                            </label>

                            <label className="relative ">
                                <p className="mt-3 ">Confirm Password</p>
                                <input
                                    type={showConfirmPassword? "text":"password"}
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={changeHandler}
                                    placeholder="Confirm Password"
                                    className="text-pure-greys-5 bg-richblack-600 p-2 rounded-md w-full"
                                 />
                                <span onClick={()=> setShowConfirmPassword((prev)=> !prev)} 
                                className="absolute translate-x-[-30px] translate-y-[10px]">
                                    {
                                        showConfirmPassword? <AiOutlineEyeInvisible fontSize={24}/>:
                                        <AiOutlineEye fontSize={24}/>
                                    }
                                </span>
                            </label>
                            <button type="submit" className="mt-5 bg-yellow-25 text-richblack-700 rounded-md p-2 w-full" >
                                Reset Password
                            </button>
                        </form>

                        <div  >
                            <Link to="/login" className="flex items-center text-pure-greys-5 gap-1">
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

export default UpdatePassword