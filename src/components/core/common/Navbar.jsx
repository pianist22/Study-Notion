
import React, { useEffect } from "react";
import { Link, matchPath, useNavigate } from "react-router-dom";
import logo from "../../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks} from "../../../data/navbar-links";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
// import ProfileDropDown from "../Auth/ProfileDropDown"; 
import { apiConnector } from "../../../services/apiconnector";
import { categories } from "../../../services/apis";
import { useState } from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { logout } from "../../../services/operations/authAPI";
import toast from "react-hot-toast";
import { AiOutlineMenu } from "react-icons/ai";
import ProfileDropDown from "./ProfileDropDown";
import NavSideBar from "./NavSideBar";
// import Sidebar from "./Sidebar";
// import ProfileDropdown from "../Auth/ProfileDropDown";

// const subLinks = [
//     {
//         title: "python",
//         link:"/catalog/python"
//     },
//     {
//         title: "web dev",
//         link:"/catalog/web-development"
//     },
// ];

const Navbar = ()=>{
    console.log("Printing the base URL:",process.env.REACT_APP_BASE_URL);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {token} = useSelector((state)=> state.auth);
    const {user}  = useSelector((state)=> state.profile);
    const {totalItems} = useSelector((state)=> state.cart);
    const [subLinks,setSubLinks] = useState([]);
    const fetchSubLinks = async()=>{
        
        try{
            const result = await apiConnector("GET",categories.CATEGORIES_API);
            console.log("Printing the result data",result);
            setSubLinks(result.data.data);
            
        }
        catch(error){
            console.log("Couldn't fetch Category Data");
        }
    }

    useEffect(()=>{
        fetchSubLinks();
    },[]);

    function matchRoute(route){
        return matchPath({path:route},location.pathname)
    }
    function clickHandler(){
        dispatch(logout(navigate));
    }
    return (
        <div className="flex h-14 w-screen items-center justify-center border-b-[1px] border-richblack-700  fixed inset-x-0 drop-shadow-md bg-richblack-900 z-30">
            <div className="flex w-11/12 max-w-maxContent items-center justify-between ">
                {/* Image */}
                <Link to="/">
                    <img src={logo} width={160} height={42} loading="lazy"/>
                </Link>

                {/* Nav Links */}
                <nav className="hidden md:block ">
                    <ul className="flex gap-x-10 text-richblack-25">
                        {
                            NavbarLinks.map((link,index)=>{
                                return <li key={index}>
                                    {
                                        link.title === "Catalog"?
                                        (
                                        <div className={`group relative flex cursor-pointer items-center gap-1 ${
                                            matchRoute("/catalog/:catalogName")
                                              ? "text-yellow-25"
                                              : "text-richblack-25"
                                          }`}>
                                            <p>{link.title}</p>
                                            <IoIosArrowDropdownCircle/>
                                            <div className='invisible absolute left-[50%]
                                    translate-x-[-50%] translate-y-[10%]
                                 top-[50%]
                                flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                                opacity-0 transition-all duration-200 group-hover:visible
                                group-hover:opacity-100 lg:w-[300px]'>

                                <div className='absolute left-[50%] top-0
                                translate-x-[80%]
                                translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5'>
                                </div>

                                {
                                    subLinks.length ? (
                                            subLinks.map( (subLink, index) => (
                                                <Link to={`/catalog/${subLink.name
                                                    .split(" ")
                                                    .join("-")
                                                    .toLowerCase()}`} key={index}
                                                    className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50">
                                                    <p className="text-richblack-700 font-semibold mb-2  uppercase">{subLink.name}</p>
                                                </Link>
                                            ) )
                                    ) : (<div>
                                        <p className="text-center text-pure-greys-5">No Courses Found</p>
                                    </div>)
                                }

                                </div>
                                        </div>):
                                        (
                                            <Link to={link?.path}>
                                                <p className={`${matchRoute(link?.path)?"text-yellow-25":"text-richblack-25"}`}>{link.title}</p>
                                            </Link>
                                        )
                                    }
                                </li>
                            })
                        }
                    </ul>
                </nav>

                {/* login/ signUp/ dashboard */}
                <div className="hidden items-center gap-x-4 md:flex">
                    
                    {
                        user && user?.accountType != "Instructor" && (
                            <Link to="/dashboard/cart" className="relative">
                                <AiOutlineShoppingCart className="text-2xl text-richblack-100"/>
                                {
                                    totalItems > 0 && (
                                        <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                                            {totalItems}
                                        </span>
                                    )
                                }
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/login">
                                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                                    Log In
                                </button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                        
                            <Link to="/signUp">
                                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
                                    Sign Up 
                                </button>
                            </Link>
   
                        )
                    }
                    {
                        token !== null && 
                        (
                            <div className="">
                                <ProfileDropDown/>
                            </div>
                        )
                    }
                </div>
                <div className="md:hidden flex items-center">
                {
                        user && user?.accountType != "Instructor" && (
                            <Link to="/dashboard/cart" className="relative">
                                <AiOutlineShoppingCart className="text-base text-richblack-100 translate-x-[-30px]"/>
                                {
                                    totalItems > 0 && (
                                        <span className="absolute -bottom-2 translate-x-[-24px] grid h-3 w-3 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-[11px] font-bold text-yellow-100">
                                            {totalItems}
                                        </span>
                                    )
                                }
                            </Link>
                        )
                    }
                    <NavSideBar/>
                    <div className="mr-1 md:hidden translate-y-1">
                        {
                            token !== null && 
                            (
                                <ProfileDropDown/>
                            )
                        }
                    </div>
                </div>


            </div>
        </div>
    );
}

export default Navbar;