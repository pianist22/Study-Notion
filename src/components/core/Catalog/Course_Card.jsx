import React from "react";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import GetAvgRating from "../../../utils/avgRating";
import RatingStars from "../common/RatingStars";
 
const Course_Card = ({course, Height}) => {


    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(()=> {
        const count = GetAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count);
    },[course])


    
  return (
    <div>
        <Link to={`/courses/${course._id}`} className="transition-all duration-200 hover:scale-95 w-fit hover:shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]">
            <div>
                <div >
                    <img 
                        src={course?.thumbnail}
                        alt='course ka thumbnail'
                        className={`${Height} w-full rounded-xl object-cover`}
                    />
                </div>
                <div>
                    <p className="font-semibold text-xl">{course?.courseName}</p>
                    <p>{course?.instructor?.firstName} {course?.instructor?.lastName} </p>
                    <div className='flex gap-x-3'>
                        <span>{avgReviewCount || 0}</span>
                        <RatingStars Review_Count={avgReviewCount} />
                        <span>{course?.ratingAndReviews?.length} Ratings</span>
                    </div>
                    <p>{course?.price}</p>
                </div>
            </div>
        </Link>

      
    </div>
  )
}

export default Course_Card