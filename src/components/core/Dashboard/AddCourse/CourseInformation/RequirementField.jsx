
import React from "react";
import { useState,useEffect } from "react";

const RequirementField = ({name,label,register,setValue,getValues,errors})=>{
    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([]);

    useEffect(()=>{
        register(name,{
            required:true,
        })
    },[]);

    useEffect(()=>{
        setValue(name,requirementList);
    },[requirementList]);

    const handleAddRequirement= ()=>{
        if(requirement){
            setRequirementList([...requirementList,requirement]);
            // setRequirement("");
        }
    }

    const handleRemoveRequirement = (index)=>{
        const updatedRequirementList = [...requirementList];
        updatedRequirementList.splice(index, 1);
        setRequirementList(updatedRequirementList);
    }
    return (
        <div className="flex flex-col gap-2 ">

        <label htmlFor={name} className="text-pure-greys-5">{label}<sup>*</sup></label>
        <div>
            <input
                type='text'
                id={name}
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                className='w-full rounded-md p-2 text-pure-greys-5 bg-richblack-700'
            />
            <button
            type='button'
            onClick={handleAddRequirement}
            className='font-semibold text-yellow-50'>
                Add
            </button>
        </div>

        {
            requirementList.length > 0 && (
                <ul>
                    {
                        requirementList.map((requirement, index) => (
                            <li key={index} className='flex items-center text-richblack-5'>
                                <span>{requirement}</span>
                                <button
                                type='button'
                                onClick={() => handleRemoveRequirement(index)}
                                className='text-xs text-pure-greys-300'>
                                    clear
                                </button>
                            </li>
                        ))
                    }
                </ul>
            )
        }
        {errors[name] && (
            <span>
                {label} is required
            </span>
        )}
      
    </div>
    )
}

export default RequirementField