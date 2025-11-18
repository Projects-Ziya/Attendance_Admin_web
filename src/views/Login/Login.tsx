import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import login from '../../assets/images/login.png';
import logo from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";
import toast from "react-hot-toast";

import { AuthVM } from "../../viewmodels/authViewModel";
export default function ZiyaAttendLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  // ✅ Load remembered email on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  useEffect(() => {
  const access = Cookies.get("access");
  if (access) {
    navigate("/dashboard");
  }
}, [navigate]);

const handleSubmit = async () => {
  try {
    const data = await AuthVM.handleLogin(email, password, rememberMe);

    if (data.success) {
      console.log("Login successful:", data);
      navigate("/dashboard");
    } else {
      toast.error(data.error || data.message || "Login failed.");
    }
  } catch (error) {
    console.error("Error during login:", error);
    toast.error("Something went wrong. Please try again later.");
  }
};
  return (
    <div className="min-h-screen flex p-3">
      {/* Left Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-100"
          style={{ backgroundImage: `url(${login})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
      </div>

      {/* Right Login Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            <img src={logo} alt="Ziya Academy Logo" className="h-20" />
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-ziyablue mb-2">
              Welcome to Ziya Attendance!
            </h2>
            <p className="text-[#94C21A]">Please Login to your account</p>
          </div>

          <div className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-500 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-primaryradius focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-500 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-primaryradius focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-cyan-600 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500 focus:ring-2"
                />
                <span className="text-sm text-gray-600">Remember Me</span>
              </label>
              <a href="/forgot-password" className="text-sm text-cyan-600 hover:text-cyan-700 font-medium">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-ziyablue text-white py-3 px-4 rounded-primaryradius font-medium hover:from-cyan-600 hover:to-blue-700 focus:outline-none transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
