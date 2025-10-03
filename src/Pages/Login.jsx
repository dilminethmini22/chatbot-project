import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";


function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Email:", email);
        // Add authentication logic here
    };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            console.log("User signed in:", result.user);
            navigate("/chatbot");
        } catch (error) {
            if (error.code === 'auth/popup-blocked') {
                alert('Please allow popups for this site to sign in with Google.');
            } else if (error.code === 'auth/cancelled-popup-request') {
                console.log('Google sign-in popup was closed.');
            } else {
                console.error("Google sign-in error:", error);
            }
        }
    };

    const handleMicrosoftLogin = () => {
        console.log("Microsoft login clicked");
        // Add Microsoft authentication logic here
    };

    return (
        <div
            className="flex flex-col md:flex-row items-center justify-center min-h-screen text-white px-6 md:px-16 text-center md:text-left gap-8 md:gap-16"
            style={{
                background:
                    "linear-gradient(to top left, black 20%, #0b2249 50%, #1e3a8a 75%, #60a5fa 100%)",
            }}
        >
            <div className="backdrop-blur-sm border border-white border-opacity-20 p-8 rounded-2xl shadow-2xl w-full max-w-sm text-white">
                <h2 className="text-3xl font-bold text-center mb-8 text-white">Welcome Back</h2>


                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-white bg-opacity-1 border border-white border-opacity-30 rounded-lg placeholder-gray-600 text-black focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 font-semibold shadow-lg"
                    >
                        Continue with Email
                    </button>
                </form>

                <div className="flex items-center mb-6 mt-9">
                    <div className="flex-1 border-t border-white border-opacity-30"></div>
                    <span className="px-3 text-sm text-gray-300">or</span>
                    <div className="flex-1 border-t border-white border-opacity-30"></div>
                </div>

                {/* Social Login Buttons */}
                <div className="space-y-3 mb-6">
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-3 backdrop-blur-sm border border-white border-opacity-30 text-white py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-opacity-10"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continue with Google
                    </button>

                    <button
                        onClick={handleMicrosoftLogin}
                        className="w-full flex items-center justify-center gap-3 backdrop-blur-sm border border-white border-opacity-30 text-white py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-opacity-10"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#f25022" d="M1 1h10v10H1z" />
                            <path fill="#00a4ef" d="M13 1h10v10H13z" />
                            <path fill="#7fba00" d="M1 13h10v10H1z" />
                            <path fill="#ffb900" d="M13 13h10v10H13z" />
                        </svg>
                        Continue with Microsoft
                    </button>
                </div>



                {/* Email Login Form */}


                <p className="mt-6 text-sm text-center text-gray-300">
                    Don't have an account?{" "}
                    <Link to="/Login" className="text-blue-300 hover:text-blue-200 hover:underline transition-colors duration-300">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
