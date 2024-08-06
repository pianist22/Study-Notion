const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/Subsection");
// Create Section handler
exports.createSection = async(req,res)=>{
    try{
        // data fetch
        const {sectionName,courseId} = req.body;

        // data validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:'All fields are required',
            });
        }

        // create section 
        const newSection = await Section.create({sectionName});

        // update course with section objectId
        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId,
            {
                $push:{
                    courseContent:newSection._id,
                }
            },
            {new:true}
        ).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
        .exec();

        // return response
        return res.status(200).json({
            success:true,
            message:'New Section is created Successfully',
            // newSection,
            updatedCourseDetails,
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'Error in creting section, Please try again',
            error:error.message,
        });
    }
}

// Update section handler
exports.updateSection = async(req,res)=>{
    try{
		const { sectionName, sectionId,courseId } = req.body;
		const section = await Section.findByIdAndUpdate(
			sectionId,
			{ sectionName },
			{ new: true }
		);

		const course = await Course.findById(courseId)
		.populate({
			path:"courseContent",
			populate:{
				path:"subSection",
			},
		})
		.exec();

		res.status(200).json({
			success: true,
			message: section,
			data:course,
		});
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'Section cannot be updated, Please try again',
            error:error.message,
        }
        );
    }
}

// delete Section 
exports.deleteSection = async(req,res)=>{
    try{
		const { sectionId, courseId }  = req.body;
		await Course.findByIdAndUpdate(courseId, {
			$pull: {
				courseContent: sectionId,
			}
		})
		const section = await Section.findById(sectionId);
		console.log(sectionId, courseId);
		if(!section) {
			return res.status(404).json({
				success:false,
				message:"Section not Found",
			})
		}

		//delete sub section
		await SubSection.deleteMany({_id: {$in: section.subSection}});

		await Section.findByIdAndDelete(sectionId);

		//find the updated course and return 
		const course = await Course.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		})
		.exec();

		res.status(200).json({
			success:true,
			message:"Section deleted",
			data:course
		});
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'Unable to delete Section, Please try again',
            error: error.message,
        })
    }
};