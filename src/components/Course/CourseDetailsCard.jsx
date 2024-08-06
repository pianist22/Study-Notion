import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import { toast } from 'react-hot-toast';
import {ACCOUNT_TYPE} from "../../utils/constants";
import { addToCart } from '../../slices/cartSlice';
import { FaShareSquare } from "react-icons/fa";

const CourseDetailsCard = ({course, setConfirmationModal, handleBuyCourse})=>{
    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state)=>state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        thumbnail: ThumbnailImage,
        price: CurrentPrice,

    } = course;


    const handleAddToCart = () => {
        if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("You are an Instructor, you cant buy a course");
            return;
        }
        if(token) {
            console.log("dispatching add to cart")
            dispatch(addToCart(course));
            return;
        }
        setConfirmationModal({
            text1:"you are not logged in",
            text2:"Please login to add to cart",
            btn1text:"login",
            btn2Text:"cancel",
            btn1Handler:()=>navigate("/login"),
            btn2Handler: ()=> setConfirmationModal(null),
        })
    }

    const handleShare = () => {
        copy(window.location.href);
        toast.success("Link Copied to Clipboard")
    }
    return (
        <div className='flex flex-col bg-richblack-700 p-1 rounded-md w-[100%] lg:w-[35%] md:translate-y-[-250px] md:translate-x-[800px] justify-center items-center '>
            <img 
                src={ThumbnailImage}
                alt='Thumbnail Image'
                className='max-h-[200px] w-[400px] rounded-md translate-y-[10px]'
            />
            <div className='text-3xl font-semibold mr-auto translate-x-[12px] mt-4 mb-2'>
                Rs. {CurrentPrice}
            </div>
            <div className='flex flex-col gap-y-6 w-full mr-auto translate-x-[6px] items-center justify-center '>
                <button
                 className='bg-yellow-50 w-[95%]  text-richblack-900 rounded-md p-2'
                    onClick={
                        user && course?.studentsEnrolled.includes(user?._id)
                        ? ()=> navigate("/dashboard/enrolled-courses")
                        : handleBuyCourse
                    }
                >
                    {
                        user && course?.studentsEnrolled.includes(user?._id) ? "Go to Course ": "Buy Now"
                    }
                </button>

                {
                    (!course?.studentsEnrolled.includes(user?._id)) && (
                        <button onClick={handleAddToCart}  
                        className='bg-yellow-50 w-[95%]  text-richblack-900 rounded-md p-2'>
                            Add to Cart
                        </button>
                    )
                }
            </div>

            <div className='mt-4 mr-auto'>
                <p className='text-richblack-300 text-sm mx-auto md:translate-x-[120px] mb-2' >
                    30-Day Money-Back Guarantee
                </p>
                <p className='text-lg font-semibold translate-x-[16px]'>
                    This Course Includes:
                </p>
                <div className='flex flex-col gap-y-3'>
                    {
                        course?.instruction?.map((item, index)=> (
                            <p key={index} className='flex gap-2 translate-x-[16px]'>
                                <span className='text-caribbeangreen-300'>{item}</span>
                            </p>
                        ))
                    }
                </div>
            </div>
            <div>
                <button
                className='mx-auto flex items-center gap-2 p-6 text-yellow-50'
                onClick={handleShare}
                >
                    <FaShareSquare className='text-yellow-50'/>
                    Share
                </button>
            </div>


        </div>
    );
}

export default CourseDetailsCard