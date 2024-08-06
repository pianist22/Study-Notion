import React from "react";

const Stats = [
    {count: "5K", label: "Active Students"},
    {count: "10+", label: "Mentors"},
    {count: "200+", label: "Courses"},
    {count: "50+", label: "Awards"},
];

const StatsComponent = ()=>{
    return (
        <section>
            <div className="bg-richblack-700 py-8 mt-10 mb-10">
                <div className="flex gap-x-52 justify-center w-[90%] mx-auto">
                    {
                        Stats.map((data,index)=>{
                            return (
                                <div key={index}>
                                    <h1 className="text-center text-3xl font-semibold">{data.count}</h1>
                                    <h2 className="text-richblack-300">{data.label}</h2>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

export default StatsComponent