import React from "react";
import HighlightText from "../Homepage/HighlightText";

const Quote = ()=>{
    return (
        <div className="text-4xl font-semibold text-center ">
        We are passionate about revolutionizing the way we learn. Our innovative platform
        <HighlightText text={" combines technology"}/>
        <span className='color1'>
          {" "}
          expertise
        </span>
        , and community to create an 
        <span  className='color2'>
        {" "}
          unparalleled educational experience.
        </span>
      </div>
    )
}

export default Quote