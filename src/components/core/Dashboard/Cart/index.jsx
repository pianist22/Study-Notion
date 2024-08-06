import { useSelector } from "react-redux"

import RenderCartCourses from "./RenderCartCourses"
import RenderTotalAmount from "./RenderTotalAmount"

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart)

  return (
    <div className="w-full flex flex-col mx-auto max-w-maxContent md:translate-x-[200px]">
      <h1 className="mb-14 text-3xl font-medium text-richblack-5 ">Cart</h1>
      <p className="border-b text-center border-b-richblack-400 pb-2 font-semibold text-richblack-400 w-[400px]">
        {totalItems} Courses in Cart
      </p>
      {total > 0 ? (
        <div className="mt-8 flex flex-col-reverse items-start gap-x-10 gap-y-6 lg:flex-row">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <p className="mt-14 text-center text-3xl text-richblack-100 w-full ">
          Your cart is empty
        </p>
      )}
    </div>
  )
}