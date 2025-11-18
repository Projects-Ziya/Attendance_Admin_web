import React, { useState } from 'react';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import login from '../../assets/images/Createacc.jpg';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

const handleResetPassword = async () => {
  if (!password || !confirmPassword) {
    return setError("Please fill in both fields.");
  }
  if (password !== confirmPassword) {
    return setError("Passwords do not match!");
  }

  setIsSubmitting(true);
  setError("");

  try {
    const response = await fetch("http://localhost:8000/api/reset-password/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, new_password: password }),
    });

    const data = await response.json();

    if (response.ok && data.success) {
      toast.success("✅ Password reset successful!");
      navigate("/");
    } else {
      setError(data.error || "❌ Failed to reset password.");
    }
  } catch (err) {
    setError("🚨 Server error. Please try again later.");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="min-h-screen flex p-3">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${login})` }}
        />
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="text-left mb-8">
            <h2 className="text-2xl font-semibold text-ziyablack mb-2">Set new password</h2>
            <p className="text-base text-gray-700"><span className="font-semibold">{email}</span></p>
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-m font-semibold text-ziyablack mb-3">
                New Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-primaryradius focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-m font-semibold text-ziyablack mb-3">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-primaryradius focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showConfirmPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="button"
              onClick={handleResetPassword }
              disabled={isSubmitting}
              className="w-full bg-ziyablue text-xl text-white py-3 px-4 rounded-primaryradius font-medium hover:from-cyan-600 hover:to-blue-700 focus:outline-none transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isSubmitting ? 'Resetting...' : 'Reset Password'}
            </button>
          </div>

          <div className="mt-4 flex justify-center items-center">
            <ArrowLeft className="w-4 h-4 mr-2 text-ziyablack font-semibold" />
            <a href="/" className="text-ziyablack text-base font-semibold hover:underline">
              Back to log in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
