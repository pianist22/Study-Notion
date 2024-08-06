import React from "react"
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/core/common/Footer";
import {apiConnector} from "../services/apiconnector";
import {categories } from "../services/apis";
import {getCatalogaPageData} from "../services/operations/pageAndComponentData";
import Course_Card from "../components/core/Catalog/Course_Card";
import CourseSlider from "../components/core/Catalog/CourseSlider";

const Catalog = ()=>{
    const {catalogName} = useParams();
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");
    const [active1,setActive1] = useState(false);
    const [active2,setActive2] = useState(false);

    //Fetch all categories
    useEffect(()=> {
        const getCategories = async() => {
            const res = await apiConnector("GET", categories.CATEGORIES_API);
            const category_id = 
            res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
            setCategoryId(category_id);
        }
        getCategories();
    },[catalogName]);

    useEffect(() => {
        const getCategoryDetails = async() => {
            try{
                const res = await getCatalogaPageData(categoryId);
                console.log("PRinting res: ", res);
                setCatalogPageData(res);
                console.log("catalogPageData",catalogPageData);
            }
            catch(error) {
                console.log(error)
            }
        }
        if(categoryId) {
            getCategoryDetails();
        }
        
    },[categoryId]);


  return (
    <div className='text-white mt-14 w-11/12  flex flex-col item-center justify-center mx-auto'>

        <div className="bg-richblack-700 mt-[-25px] w-screen ml-[-60px] py-10">
            <p className="mt-10 text-richblack-300 text-base ml-[60px] ">{`Home / Catalog /`}
            <span className="text-yellow-25">
                {catalogPageData?.data?.selectedCategory?.name}
            </span></p>
            <p className="text-3xl ml-[60px] mt-2 mb-2 "> {catalogPageData?.data?.selectedCategory?.name} </p>
            <p className="text-richblack-300 text-base ml-[60px]"> {catalogPageData?.data?.selectedCategory?.description}</p>
        </div>

        <div>
            {/* section1 */}
            <div>
            <div className="text-3xl font-semibold mt-5 mb-2">Courses to get you started</div>
                <div className=' flex gap-x-3 ml-3'>
                    <p onClick={()=> setActive1(!active1)} className={`${active1? "text-yellow-25 border-b-2 border-richblack-300":"text-richblack-300" }`}>Most Popular</p>
                    <p onClick={()=> setActive1(!active1)} className={`${!active1? "text-yellow-25 border-b-2 border-richblack-300":"text-richblack-300" }`}>New</p>
                </div>
                <div className="mt-2">
                    <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses} />
                </div>
            </div>  

            {/* section2 */}
            <div className="mt-10">
            <div className="text-3xl font-semibold mt-3 mb-2 ">Top Courses </div>
                <div>
                    <CourseSlider Courses={catalogPageData?.data?.differentCategory?.courses}/>
                </div>
            </div>

            {/* section3 */}
            <div className="mt-10">
                <div className="text-3xl font-semibold mt-3 mb-2 ">Frequently Bought</div>
                <div className='py-8'>

                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>

                        {
                            catalogPageData?.data?.mostSellingCourses?.slice(0,4)
                            .map((course, index) => (
                                <Course_Card course={course} key={index} Height={"h-[320px]"}/>
                            ))
                        }

                    </div>

                </div>
            </div>

        </div>
        <Footer />
    </div>
  )
}

export default Catalog