
const RatingAndReviews = require("../models/RatingAndReviews");
const Course = require("../models/Course");
const mongoose = require("mongoose");

exports.createRating = async (req, res) => {
    try{

        //get user id
        const userId = req.user.id;
        //fetchdata from req body
        const {rating, review, courseId} = req.body;
        //check if user is enrolled or not
        const courseDetails = await Course.findOne(
                                    {_id:courseId,
                                    studentsEnrolled: {$elemMatch: {$eq: userId} },
                                });

        if(!courseDetails) {
            return res.status(404).json({
                success:false,
                message:'Student is not enrolled in the course',
            });
        }
        //check if user already reviewed the course
        const alreadyReviewed = await RatingAndReviews.findOne({
                                                user:userId,
                                                course:courseId,
                                            });
        if(alreadyReviewed) {
                    return res.status(403).json({
                        success:false,
                        message:'Course is already reviewed by the user',
                    });
                }
        //create rating and review
        const ratingReview = await RatingAndReviews.create({
                                        rating, review, 
                                        course:courseId,
                                        user:userId,
                                    });
       
        //update course with this rating/review
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId},
                                    {
                                        $push: {
                                            ratingAndReviews: ratingReview._id,
                                        }
                                    },
                                    {new: true});
        console.log(updatedCourseDetails);
        //return response
        return res.status(200).json({
            success:true,
            message:"Rating and Review created Successfully",
            ratingReview,
        })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

// getAverageRating
exports.getAverageRating = async(req,res)=>{
    try{
        // get courseId
        const courseId = req.body.courseId;

        // calculate Average rating
        const result = await RatingAndReviews.aggregate([
            {
                $match:{
                    course: new mongoose.Schema.Types.ObjectId(courseId),
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"},
                }
            }
        ]);

        // return rating
        if(result.length > 0){
            return res.status(200).json({
                success:true,
                averageRating: result[0].averageRating,
            });
        }

        // if no rating and reviews exists 
        return res.status(200).json({
            success:true,
            message:'Average Rating is 0,  till now no ratings has been given',
            averageRating:0,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Error in getting Average Rating',
            error:error.message,
        });
    }
}


//getAllRatingAndReviews
exports.getAllRating = async (req, res) => {
    try{
            const allReviews = await RatingAndReviews.find({})
                                    .sort({rating: "desc"})
                                    .populate({
                                        path:"user",
                                        select:"firstName lastName email image",
                                    })
                                    .populate({
                                        path:"course",
                                        select: "courseName",
                                    })
                                    .exec();
            return res.status(200).json({
                success:true,
                message:"All reviews fetched successfully",
                data:allReviews,
            });
    }   
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    } 
}

// getAllRatingAndReviewsSpecificCourse -> This function will return all the rating and reviews specific to a particular course
exports.getAllRatingAndReviewCourse = async(req,res)=>{
    try{
        const courseId = req.body.courseId;
        // validation
        if(!courseId){
            return res.status(400).json({
                success:false,
                message:'Please enter a courseId',
            });
        }

        // fetch rating and reviews for specified course
        const ratingAndReviews = await RatingAndReviews.find({
            course:courseId,
        })
        .populate({
            path:"User",
            select:"firstName lastName",
        })
        .populate({
            path:"Course",
            select:"courseName",
        })
        .exec();

        // return response
        return res.status(200).json({
            success:true,
            message:'Rating and Reviews fetched successfully for the specified course',
            data:ratingAndReviews,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Error in getting All Ratings and reviews for the specified course',
            error:error.message,
        });        
    }
}

