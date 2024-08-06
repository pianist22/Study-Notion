
import RenderSteps from "./RenderSteps"
import { BsLightningChargeFill } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { useSelector } from "react-redux";

export default function AddCourse(){
    const {step} = useSelector((state)=>state.course);
    return (
        <>
            <div className="text-white">
                <div className="flex flex-col items-center min-w-11/12 lg:max-w-[500px]  justify-center mx-auto lg:translate-x-[200px]">
                    <h1 className="mr-auto text-3xl font-semibold mb-10">Add Course </h1>
                    <div>
                        <RenderSteps/>
                    </div>
                </div>
                {
                    (step  === 1)?
                    (
                        <div className="fixed max-w-[400px] flex-1 translate-x-[710px] translate-y-[-1545px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 ">
                        <div className="flex gap-2 items-center mb-10 ">
                            <BsLightningChargeFill className="text-yellow-50" fontSize={24}/>
                            <p className="text-2xl font-semibold ">Code Upload Tips</p>
                        </div>
                        <ul>
                            <li className="flex gap-2 items-center mb-3">
                                <GoDotFill/>
                                <p>
                                Set the Course Price option or make it free.
                                </p>
                            </li>
                            <li className="flex gap-2 items-center mb-3">
                                <GoDotFill/>
                                <p>
                                Standard size for the course thumbnail is 1024x576.
                                </p>
                            </li>
                            <li className="flex gap-2 items-center mb-3">
                                <GoDotFill/>
                                <p>
                                Video section controls the course overview video.
                                </p>
                            </li>
                            <li className="flex gap-2 items-center mb-3">
                                <GoDotFill/>
                                <p>
                                Course Builder is where you create & organize a course.
                                </p>
                            </li>
                            <li className="flex gap-2 items-center mb-3">
                                <GoDotFill/>
                                <p>
                                Add Topics in the Course Builder section to create lessons,
                  quizzes, and assignments.
                                </p>
                            </li>
                            <li className="flex gap-2 items-center mb-3">
                                <GoDotFill/>
                                <p>
                                Information from the Additional Data section shows up on the
                                course single page.
                                </p>
                            </li>
                            <li className="flex gap-2 items-center mb-3">
                                <GoDotFill/>
                                <p>
                                Make Announcements to notify any important.
                                </p>
                            </li>
                            <li className="flex gap-2 items-center mb-3">
                                <GoDotFill/>
                                <p>
                                Notes to all enrolled students at once.
                                </p>
                            </li>
                        </ul>
                    </div>
                    ):
                    (
                        <div></div>
                    )

                }
                {
                    step === 2?
                    (
                        <div className="max-w-[400px] flex-1 translate-x-[700px] z-0 translate-y-[-520px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 ">
                        <div className="flex gap-2 items-center mb-10 ">
                            <BsLightningChargeFill className="text-yellow-50" fontSize={24}/>
                            <p className="text-2xl font-semibold ">Code Upload Tips</p>
                        </div>
                        <ul>
                            <li className="flex gap-2 items-center mb-3">
                                <GoDotFill/>
                                <p>
                                Set the Course Price option or make it free.
                                </p>
                            </li>
                            <li className="flex gap-2 items-center mb-3">
                                <GoDotFill/>
                                <p>
                                Standard size for the course thumbnail is 1024x576.
                                </p>
                            </li>
                            <li className="flex gap-2 items-center mb-3">
                                <GoDotFill/>
                                <p>
                                Video section controls the course overview video.
                                </p>
                            </li>
                            <li className="flex gap-2 items-center mb-3">
                                <GoDotFill/>
                                <p>
                                Course Builder is where you create & organize a course.
                                </p>
                            </li>
                            <li className="flex gap-2 items-center mb-3">
                                <GoDotFill/>
                                <p>
                                Add Topics in the Course Builder section to create lessons,
                  quizzes, and assignments.
                                </p>
                            </li>
                            <li className="flex gap-2 items-center mb-3">
                                <GoDotFill/>
                                <p>
                                Information from the Additional Data section shows up on the
                                course single page.
                                </p>
                            </li>
                            <li className="flex gap-2 items-center mb-3">
                                <GoDotFill/>
                                <p>
                                Make Announcements to notify any important.
                                </p>
                            </li>
                            <li className="flex gap-2 items-center mb-3">
                                <GoDotFill/>
                                <p>
                                Notes to all enrolled students at once.
                                </p>
                            </li>
                        </ul>
                    </div>
                    ):
                    (
                        <div></div>
                    )
                }
            </div>
        </>
    )
}