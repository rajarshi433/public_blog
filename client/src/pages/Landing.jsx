import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import hero_bg from "../assets/images/hero_bg.jpg";


const Landing = () => {

    const email = useSelector((state) => state.auth.email);


    return (
        <div className='relative'>
            <img src={hero_bg} alt="" className='w-full h-full inset-0 opacity-50 absolute object-cover'></img>
            <nav className='bg-[#1e293b] text-white justify-center z-20 flex flex-row text-xl py-3 font-Play fixed w-full'>
                <Link to={email ? '/' : '/login'} className='mx-2 p-2 border hover:text-gray-300 border-[#1e293b] hover:border-gray-300 rounded-lg'>Read</Link>
                <Link to='#' className='mx-2 p-2 border hover:text-gray-300 border-[#1e293b] hover:border-gray-300 rounded-lg'>About</Link>
                <Link to='#' className='mx-2 p-2 border hover:text-gray-300 border-[#1e293b] hover:border-gray-300 rounded-lg'>Contact Us</Link>
            </nav>
            <div className='flex h-[100vh] items-center justify-center relative z-10'>
                <section className=" lg:bg-none dark:bg-gray-900 mx-3 flex items-center">
                    <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                        <div className="mr-auto place-self-center lg:col-span-7">
                            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white font-Play">Welcome to BlogMate</h1>
                            <p className="max-w-2xl mb-6 font-bold text-lg text-black lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400 font-Josefin-Sans">Write your own story!</p>
                            <Link to="/login" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center bg-green-600 text-white border border-gray-300 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                                Log In
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Landing;