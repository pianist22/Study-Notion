import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import { useDispatch, useSelector } from "react-redux";
import SideBarLink from "./SideBarLink";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../common/ConfirmationModal";
import { VscSignOut } from "react-icons/vsc";
import { openModal,closeModal } from "../../../hooks/modal";
import { AiOutlineMenu } from "react-icons/ai";


const SideBar2 = ()=>{
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        console.log(isOpen);
      setIsOpen(!isOpen);
    }
    const {user,loading:profileLoading} = useSelector((state)=> state.profile);
    const {loading:authLoading} = useSelector((state)=> state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [confirmationModal,setConfirmationModal] = useState(null);

    if(authLoading || profileLoading){
        return (
            <div className="spinner">
            </div>
        )
    }
    return (
    <div>
        <div className="absolute z-20">
            <button onClick={toggleSidebar} className="mr-2 md:hidden translate-x-[-24px] translate-y-[-10px]">
                <AiOutlineMenu fontSize={20} fill="#AFB2BF" />
            </button>
        </div>

        {/* Sidebar */}
        <div
        className={`fixed top-0 right-2 w-64 bg-richblack-900 text-white transition-transform transform ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        >
            <div className="text-richblack-300 mt-[25px] z-20 ">
                <div className="flex  flex-col border-r-[1px] border-r-richblack-700  bg-richblack-800 py-10 ">
                    <div className="flex flex-col">
                    {
                        sidebarLinks.map((link)=>{
                            if(link.type && user?.accountType !== link.type) return null;

                            return (
                                <SideBarLink key={link.id} link={link} iconName={link.icon}/>
                            )
                        })}

                    </div>

                    <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600"></div>
                    <div className="flex flex-col">
                        <SideBarLink
                        link={{name:"Settings",path:"dashboard/settings"}}
                        iconName="VscSettingsGear"/>
                        <button
                            onClick={ () => {
                            setConfirmationModal({
                            text1: "Are You Sure ?",
                            text2: "You will be logged out of your Account",
                            btn1Text: "Logout",
                            btn2Text:"Cancel",
                            btn1Handler: () => dispatch(logout(navigate)),
                            btn2Handler: () => {
                                setConfirmationModal(null);
                                closeModal();
                            },
                            });
                            openModal();
                        }
    }
                            
                            >
                                <div className='flex items-center gap-x-3 translate-x-8'>
                                    <VscSignOut className='text-lg'/>
                                    <span>Logout</span>
                                </div>
                        </button>
                    </div>
                </div>
                <div className="h-screen">
                    {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
                </div>
            </div>
        </div>
    </div>
    )
}

export default SideBar2;