
import React from "react";
import Template from "../components/core/common/Template";
import signUpImage from "../assets/Images/signup.webp";

const SignUp = () => {
    return (
      <Template
      title="Join the millions learning to code with StudyNotion for free"
      desc1="Build skills for today, tomorrow, and beyond."
      desc2="Education to future-proof your career."
      image={signUpImage}
      formType="signup"
    />
    )
  }
export default SignUp;