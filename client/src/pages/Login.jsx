import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import google from "../assets/images/google.svg";
import github from "../assets/images/github.svg";
import facebook from "../assets/images/facebook.svg";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebaseConfig";

import { signInWithGoogle } from "../store/slice/authSlice";


const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleSignIn = (e) => {
        e.preventDefault();
        dispatch(signInWithGoogle());

        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                navigate("/")
            }
        });
    }


    return (
        <>
            <div className="relative py-16 mt-6 bg-gradient-to-br from-sky-50 to-gray-200">
                <div className="relative container m-auto px-6 text-gray-500 md:px-12 xl:px-40">
                    <div className="m-auto md:w-8/12 lg:w-6/12 xl:w-6/12">
                        <div className="rounded-xl bg-white shadow-xl">
                            <div className="p-6 sm:p-16">
                                <h2 className="text-center font-Play font-extrabold text-3xl text-black">Welcome to BlogMate</h2>
                                <div className="my-16 grid space-y-4">
                                    <button
                                        className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100"
                                        onClick={handleGoogleSignIn}
                                    >
                                        <div className="relative flex items-center space-x-4 justify-center">
                                            <img
                                                src={google}
                                                className="absolute left-0 w-5"
                                                alt="google logo"
                                            />
                                            <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">
                                                Continue with Google
                                            </span>
                                        </div>
                                    </button>
                                </div>
                                <div className="mt-6 space-y-4 text-gray-600 text-center sm:-mb-8">
                                    <p className="text-xs">
                                        By proceeding, you agree to our{" "}
                                        <a href="#" className="underline">
                                            Terms of Use
                                        </a>{" "}
                                        and confirm you have read our{" "}
                                        <a href="#" className="underline">
                                            Privacy and Cookie Statement
                                        </a>
                                        .
                                    </p>
                                    <p className="text-xs">
                                        This site is protected by reCAPTCHA and the{" "}
                                        <a href="#" className="underline">
                                            Google Privacy Policy
                                        </a>{" "}
                                        and{" "}
                                        <a href="#" className="underline">
                                            Terms of Service
                                        </a>{" "}
                                        apply.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
