

import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { buyCourse } from '../services/operations/studentFeaturesAPI';
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI';
import { setCourse } from '../slices/courseSlice';
import { GrLanguage } from "react-icons/gr";
import GetAvgRating from '../utils/avgRating';
import Error from './Error';
import { IoIosInformationCircleOutline } from "react-icons/io";
import ConfirmationModal from '../components/core/common/ConfirmationModal';
import RatingStars from '../components/core/common/RatingStars';
import { formatDate } from '../services/fomatDate';
import CourseDetailsCard from "../components/Course/CourseDetailsCard";
import CourseAccordionBar from "../components/Course/CourseAccordionBar";

const CourseDetails = () => {
    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state)=>state.auth);
    const {loading} = useSelector((state) => state.profile);
    const {paymentLoading} = useSelector((state)=> state.course);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {courseId}  = useParams();

    const [courseData , setCourseData] = useState(null);
    const [confirmationModal, setConfirmationModal] = useState(null);
    useEffect(()=> {
        const getCourseFullDetails = async() => {
            try{
                const result = await fetchCourseDetails(courseId);
                console.log("Printing CourseData-> " , result);
                setCourseData(result);
                // console.log("COurseData",courseData);
                // console.log("COurseData",courseData);
            }
            catch(error) {
                console.log("Could not fetch coursse details");
            }
        }
        getCourseFullDetails();
        
    }, []);
    useEffect(()=>{
        console.log("COurseData",courseData);
    },[courseData]);

    const [avgReviewCount, setAverageReviewCount] = useState(0);

    useEffect(()=> {
        const count = GetAvgRating(courseData?.courseDetails.ratingAndReviews);
        setAverageReviewCount(count);
    },[courseData])

    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
    useEffect(()=> {
        let lectures = 0;
        courseData?.courseDetails?.courseContent?.forEach((sec) => {
            lectures += sec.subSection.length || 0
        })
        setTotalNoOfLectures(lectures);

    },[courseData]);


    const [isActive, setIsActive] = useState(Array(0));
    const handleActive = (id) => {
        setIsActive(
            !isActive.includes(id)
             ? isActive.concat(id)
             : isActive.filter((e)=> e != id)

        )
    }

    const handleBuyCourse = () => {
        
        if(token) {
            buyCourse(token, [courseId], user, navigate, dispatch);
            return;
        }
        setConfirmationModal({
            text1:"you are not Logged in",
            text2:"Please login to purchase the course",
            btn1Text:"Login",
            btn2Text:"Cancel",
            btn1Handler:() => navigate("/login"),
            btn2Handler:()=>setConfirmationModal(null),
        })

    }

    if(loading || !courseData) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    if(!courseData.success) {
        return (
            <div>
                <Error />
            </div>
        )
    }

    console.log("CourseName",courseData?.courseDetails?.courseName);
    const {
        _id: course_id,
        courseName,
        courseDescription,
        thumbnail,
        price,
        whatYouWillLearn,
        courseContent,
        ratingAndReviews,
        instructor,
        studentsEnrolled,
        createdAt,
    } = courseData?.courseDetails;

    console.log(courseName);
    console.log(course_id);

  return (
    <div className='flex flex-col  bg-richblack-900 text-white md:h-[1200px] h-[1580px]'>

        <div className=' flex flex-col justify-start p-8 bg-richblack-800 md:h-[520px] h-[920px]'>
            <div className='w-11/12 flex flex-col mx-auto justify-center lg:mt-32 mt-10'>
                <p className='text-4xl  font-semibold mb-2'>{courseName}</p>
                <p className='text-richblack-300 text-sm mb-2'>{courseDescription}</p>
                <div className='flex gap-x-2'>
                    <span className='text-yellow-25'>{avgReviewCount} </span>
                    <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                    <span>{`(${ratingAndReviews.length} reviews) `}</span>
                    <span>{`(${studentsEnrolled.length} students enrolled)`}</span>
                </div>

                <div className='mt-2 mb-2'>
                    <p>Created By {`${instructor.firstName}`}</p>
                </div>

                <div className='flex gap-x-2 items-center mt-2 mb-2'>
                    <IoIosInformationCircleOutline/>
                    <p>
                        Created At {formatDate(createdAt)}
                    </p>
                    <GrLanguage/>
                    <p>
                        {" "} English
                    </p>
                </div>

                <div className='flex flex-col md:flex-row w-[105%]'>
                    <CourseDetailsCard 
                        course = {courseData?.courseDetails}
                        setConfirmationModal = {setConfirmationModal}
                        handleBuyCourse = {handleBuyCourse}
                        />
                </div>
            </div>
        </div>

        <div className='flex w-11/12 flex-col justify-center md:translate-x-[100px] '>
            <div className='mt-10 border-2 border-richblack-400  md:w-[60%] px-4 py-6 '>
                <p className='text-3xl font-semibold'> What You WIll learn</p>
                <div>
                    {whatYouWillLearn}
                </div>
            </div>

            <div className='lg:w-[60%] mt-20'>
                <div className='text-2xl font-semibold mb-3'>
                    <p>Course Content:</p>
                </div>

                <div className='flex gap-x-3 justify-between '>

                    <div>
                        <span>{courseContent.length} section(s) </span>

                            <span>
                                {totalNoOfLectures} lecture(s) 
                            </span>
                            <span>
                                {" "}{courseData?.totalDuration} total length
                            </span>
                    </div>

                    <div>
                            <button
                                onClick={() => setIsActive([])} className='text-yellow-25'>
                                Collapse all Sections
                            </button>
                    </div>

                </div>
            </div>

            {/* Course Details Accordion */}
            <div className="py-4 lg:w-[60%]">
                {courseContent?.map((course, index) => (
                    <CourseAccordionBar
                    course={course}
                    key={index}
                    isActive={isActive}
                    handleActive={handleActive}
                    />
                ))}
            </div>

            {/* Author Details */}
            <div className="mb-12 py-4">
              <p className="text-[28px] font-semibold">Author</p>
              <div className="flex items-center gap-4 py-4">
                <img
                  src={
                    instructor.image
                      ? instructor.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                  }
                  alt="Author"
                  className="h-14 w-14 rounded-full object-cover"
                />
                <p className="text-lg">{`${instructor.firstName} ${instructor.lastName}`}</p>
              </div>
              <p className="text-richblack-50">
                {instructor?.additionalDetails?.about}
              </p>
            </div>

        </div>



        {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  )
}


export default CourseDetails
