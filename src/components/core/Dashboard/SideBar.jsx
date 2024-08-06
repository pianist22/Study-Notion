import React, { useState } from "react";
import { sidebarLinks } from "../../../data/dashboard-links";
import { logout } from "../../../services/operations/authAPI";
import { useDispatch, useSelector } from "react-redux";
import SideBarLink from "./SideBarLink";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../common/ConfirmationModal";
import { VscSignOut } from "react-icons/vsc";
import { openModal,closeModal } from "../../../hooks/modal";

const SideBar = ()=>{
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
        <div className="text-richblack-300 mt-[-25px]">
            <div className="flex min-w-[222px] flex-col border-r-[1px] border-r-richblack-700 min-h-screen h-full  bg-richblack-800 py-10 ">
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
                            <div className='flex items-center gap-x-3 translate-x-[33px] mt-1 '>
                                <VscSignOut className='text-lg'/>
                                <span>Logout</span>
                            </div>
                    </button>
                </div>
            </div>
            {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
        </div>
    )
}

export default SideBar