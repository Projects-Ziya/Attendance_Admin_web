import React, { useState, useRef } from 'react';
import login from '../../assets/images/passwordReset.jpg';
import OTPInput from '../../components/OtpInput/OutInput';
import { ArrowLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function PasswordReset() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRefs = useRef([]);
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

const handleVerifyOtp = async () => {
  const enteredOtp = otp.join("");

  if (enteredOtp.length !== 4 || otp.includes("")) {
    return setError("⚠️ Please fill all 4 OTP digits");
  }

  setIsSubmitting(true);
  setError("");

  try {
    const response = await fetch("http://localhost:8000/api/verify-otp/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp: enteredOtp }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      navigate("/confirm-password", { state: { email } });
    } else {
      setError(data.error || "❌ OTP verification failed.");
    }
  } catch (err) {
    setError("🚨 Server error. Please try again later.");
  } finally {
    setIsSubmitting(false);
  }
};
  const isOtpFilled = otp.every((digit) => digit !== "");

  return (
    <div className="min-h-screen flex p-3">
      {/* Left Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${login})` }}
        />
      </div>

      {/* Right Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="text-left mb-8">
            <h2 className="text-2xl font-semibold text-ziyablack mb-4">Password Reset</h2>
            <p className="text-base text-gray-700">
              OTP sent to: <span className="font-semibold">{email}</span>
            </p>
          </div>

          {/* 👉 OTP Component */}
          <OTPInput otp={otp} setOtp={setOtp} inputRefs={inputRefs} />

          {error && <p className="text-red-600 text-sm mt-4">{error}</p>}

          <button
            type="button"
            onClick={handleVerifyOtp}
            disabled={!isOtpFilled || isSubmitting}
            className={`w-full mt-9 text-xl py-3 px-4 rounded-[3px] font-semibold focus:outline-none transition-all transform  active:scale-[0.98]
              ${isOtpFilled ? 'bg-ziyablue text-white hover:from-cyan-600 hover:to-blue-700' : 'bg-gray-300 text-black cursor-not-allowed'}
            `}
          >
            {isSubmitting ? 'Verifying...' : 'Submit OTP'}
          </button>

          <div className="text-center mt-20 text-base font-normal text-gray-700">
            Didn’t receive the email?{" "}
            <a href="#" className="text-ziyablack font-semibold ml-1">
              Click to resend
            </a>

            <div className="mt-4 flex justify-center items-center">
              <ArrowLeft className="w-4 h-4 mr-2 text-ziyablack font-semibold" />
              <a href="/" className="text-ziyablack text-base font-semibold hover:underline">
                Back to log in
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
