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
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import ProfileDropDown from "./ProfileDropDown";
import { useRef } from "react";

const NavSideBar = ()=>{
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        console.log(isOpen);
      setIsOpen(!isOpen);
    }
    console.log("Printing the base URL:",process.env.REACT_APP_BASE_URL);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {token} = useSelector((state)=> state.auth);
    const {user}  = useSelector((state)=> state.profile);
    const {totalItems} = useSelector((state)=> state.cart);
    const [subLinks,setSubLinks] = useState([]);
    const ref = useRef(null)
  
    useOnClickOutside(ref, () => setIsOpen(false))
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
    return (
    <div>
        <div className="absolute z-20 h-screen">
            <button onClick={toggleSidebar} className="mr-2 md:hidden translate-x-[-24px] translate-y-[-10px]">
                <AiOutlineMenu fontSize={20} fill="#AFB2BF" />
            </button>
        </div>

        {/* Sidebar */}
        <div
        className={`fixed top-0 right-2 h-full w-64 bg-richblack-900 text-white transition-transform transform ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        >
        <div className="p-5 bg-richblack-900">
            <p className="text-pure-greys-5 text-lg bg-richblack-700">SideBar</p>
            <div className="border-b-2 border-pure-greys-5 w-full"></div>
                <nav className=" ">
                        <ul className="flex flex-col gap-y-3 mt-5">
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
                                        translate-x-[-190%] translate-y-[-20%]
                                    top-[50%]
                                    flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                                    opacity-0 transition-all duration-200 group-hover:visible
                                    group-hover:opacity-100 '>

                                    <div className='absolute left-[50%] top-0
                                    translate-x-[200%]
                                    translate-y-[200%] h-6 w-6 rotate-45 rounded bg-richblack-5'>
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
                <div className="flex flex-col gap-y-2 mt-2">
                    {
                        token === null && (
                            <Link to="/login">
                                <button >
                                    Log In
                                </button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                        
                            <Link to="/signUp">
                                <button >
                                    Sign Up 
                                </button>
                            </Link>
   
                        )
                    }
                </div>
        </div>
        </div>
    </div>
    )
}

export default NavSideBar;