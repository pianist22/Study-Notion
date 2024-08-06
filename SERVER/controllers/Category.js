const Category = require("../models/Category");
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }

// createCategory handler
exports.createCategory = async(req,res)=>{
    try{
        // fecth data 
        const {name,description} = req.body;

        // validation
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:'All fields are required.',
            });
        }

        // create Entry in database
        const categoryDetails = Category.create({
            name:name,
            description:description,
        });
        console.log(categoryDetails);

        // return response
        return res.status(200).json({
            success:true,
            message:'Category created Successfully',
            data: categoryDetails,
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message: error.message,
        })
    }
}

// showAll Categories handler

exports.showAllCategories = async(req,res)=>{
    try{
        const allCategories = await Category.find({},{name:true,description:true});
        return res.status(200).json({
            success:true,
            message:"All Categories are returned successfully",
            data:allCategories,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message: error.message,
        })       
    }
}

// categoryPageDetails
exports.categoryPageDetails = async(req,res)=>{
	try{
		// get categoryId 
		const {categoryId} = req.body;

		// fetch courses for specified categoryId
		const selectedCategory = await Category.findById(categoryId)
		.populate({
			path: "courses",
			match: { status: "Published" },
			populate: "ratingAndReviews",
		  })
		  .exec();

		// validation
		if(!selectedCategory){
			return res.status(404).json({
				success:false,
				message:'Data not found',
			});
		}

		// Handle the case when there are no courses
		if (selectedCategory.courses.length === 0) {
			console.log("No courses found for the selected category.");
			return res.status(404).json({
				success: false,
				message: "No courses found for the selected category.",
			});
		}
		// const selectedCourses = selectedCategory.courses;

		      // Get courses for other categories
			  const categoriesExceptSelected = await Category.find({
				_id: { $ne: categoryId },
			  })
			  let differentCategory = await Category.findOne(
				categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
				  ._id
			  )
				.populate({
				  path: "courses",
				  match: { status: "Published" },
				})
				.exec()
		// get top selling courses
		// hw-> 
		// steps:
		// fetch all category data along with thier course data 
		const allCategories = await Category.find()
		.populate({
			path: "courses",
			match: { status: "Published" },
			populate: {
			  path: "instructor",
		  },
		  })
		  .exec();

		// every category contains multiple courses we need to convert specific caegory with multiple courses data into single array of multiple courses using flatmap function 
		// then we will sort the courses array according to a arbitary sold value in descending order which will tell number of units sold for a particular course
		const allCourses = allCategories.flatMap((category)=>category.courses);

		// slice the resultant sorted array to get the 10 top most selling course
		const mostSellingCourses = allCourses
		.sort((a,b)=>b.sold - a.sold)
		.slice(0,10);

		// return response
		return res.status(200).json({
			success:true,
			message:"Details for category page detail",
			data:{
				selectedCategory,
				differentCategory,
				mostSellingCourses,
			},
		});
	}
	catch(error){
        return res.status(500).json({
            success:false,
			message:"Internal Server Error",
            message: error.message,
        })   		
	}
}