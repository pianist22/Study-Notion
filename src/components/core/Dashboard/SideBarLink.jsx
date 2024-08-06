import React from "react";
import * as Icons from "react-icons/vsc"
import { useDispatch } from "react-redux";
import { matchPath, NavLink, useLocation } from "react-router-dom";

const SideBarLink = ({link,iconName})=>{
    const Icon = Icons[iconName];
    const location = useLocation();
    const dispatch = useDispatch();

    const matchRoute = (route)=>{
        return matchPath({path:route},location.pathname);
    }
    return (
        <NavLink 
        to={link.path}
        className={`relative font-medium px-8 py-2 text-sm ${matchRoute(link.path)?"bg-yellow-800":"bg-opacity-0"}`}>
            <span className={`absolute top-0 left-0 h-full w-[0.2rem] bg-yellow-50 ${matchRoute(link.path)? "opacity-100":"opacity-0"}`}>
            </span>

                {
                    matchRoute(link.path)?
                    (
                        <div className="flex items-center gap-x-3">
                            <Icon className="text-lg text-yellow-50"/>
                            <span className="font-semibold text-yellow-50">{link.name}</span>
                        </div>                        
                    ):
                    (
                        <div className="flex items-center gap-x-3">
                            <Icon className="text-lg"/>
                            <span>{link.name}</span>
                        </div>
                    )
                }
        </NavLink>
    )
}

export default SideBarLink;