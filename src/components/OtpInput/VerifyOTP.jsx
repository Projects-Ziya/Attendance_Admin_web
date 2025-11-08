import React, { useState } from "react";
import OTPInput from "./OutInput";

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");

  const handleVerify = () => {
  
    // 🚀 Verify OTP here
  };

  return (
    <div>
      <h2>Enter the OTP</h2>
      <OTPInput otp={otp} setOtp={setOtp} />
      <button onClick={handleVerify}>Verify</button>
    </div>
  );
}
