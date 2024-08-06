import React from "react";

const TextColor = ({text,color})=>{
    return (
        <span className={`${color}`}>{text}</span>

    )
}

export default TextColor;