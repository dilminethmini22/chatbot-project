import React, { useState } from "react";
import Image1 from "../Images/Image1.png";
import { Navigate, useNavigate } from "react-router-dom";

function Home() {
    const [clicked, setClicked] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        setClicked(!clicked);
        console.log("Get Started button clicked!");
        navigate("/Login");
    };

    return (
        <div
            className="flex flex-col md:flex-row items-center justify-center min-h-screen text-white px-6 md:px-16 text-center md:text-left gap-8 md:gap-16"
            style={{
                background:
                    "linear-gradient(to top left, black 20%, #0b2249 50%, #1e3a8a 75%, #60a5fa 100%)",
            }}
        >
            {/* Left Side: Image */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-end md:pr-4">
                <img
                    src={Image1}
                    alt="AI Chatbot"
                    className="max-w-xs md:max-w-md rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300 ease-out"
                    style={{
                        filter: "drop-shadow(0 25px 50px rgba(96, 165, 250, 0.3))",
                    }}
                />
            </div>

            {/* Right Side: Text + Button */}
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-center md:text-left leading-tight">
                    Welcome to Nova AI Chat
                </h1>
                <p className="text-lg max-w-xl mb-8 text-center md:text-left leading-relaxed opacity-90">
                    Your intelligent assistant for seamless conversations, quick answers, and smart help powered by cutting-edge AI technology.
                </p>

                {/* Feature List */}
                <div className="max-w-md mb-10 space-y-3 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-sm md:text-base">Understands and responds naturally to your questions</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-sm md:text-base">Helps with everyday tasks and information</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-sm md:text-base">Secure and private — your data stays safe</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-sm md:text-base">Available anytime, anywhere — right in your browser</span>
                    </div>
                </div>

                {/* Professional Button */}
                <button
                    onClick={handleClick}
                    className="group relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-out overflow-hidden"
                >
                    {/* Button Background Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                    {/* Button Content */}
                    <div className="relative flex items-center justify-center gap-2">
                        <span className="text-lg">Get Started</span>
                        <svg
                            className={`w-5 h-5 transform transition-transform duration-300 ${clicked ? 'rotate-45' : 'group-hover:translate-x-1'}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </div>
                </button>
            </div>
        </div>
    );
}

export default Home;
