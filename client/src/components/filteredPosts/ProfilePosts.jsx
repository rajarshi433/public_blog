import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { BsBookmark } from "react-icons/bs";

import SkeletonLoader from '../Loaders/SkeletonLoader';

import moment from 'moment';


const ProfilePosts = ({ data }) => {

    const { id } = useParams();

    const dateString = data.createdAt;
    const format = 'D/M/YYYY, h:mm:ss a';
    const now = moment();
    const date = moment(dateString, format);
    const relativeTime = date.from(now);

    if (!data) {
        return <SkeletonLoader />
    }


    return (
        <>
            <div className=" h-fit -mb-2 md:mb-2 col-span-2 lg:col-span-2 lg:row-span-1 mt-6 md:mt-0 bg-blue-50 rounded-md">
                <div className="w-full flex items-stretch h-fit rounded md:col-span-1 lg:col-span-1 lg:row-span-1 col-span-2">
                    <div className="text-2xl grid grid-cols-10 gap-4 md:gap-6 max-w-fit rounded-md col-span-10">
                        <div className='md:col-span-3 col-span-4 h-full'>
                            <Link to={`/read/${data._id}`}>
                                <div className='md:p-2 p-1'>
                                    <img src={data.banner} alt="Image" className="object-cover md:w-[260px] md:h-[200px] w-[500px] h-[120px]" />
                                </div>
                            </Link>
                        </div>

                        <div className='md:p-2 md:col-span-7 col-span-6 h-full flex flex-col w-full text-black text-base'>
                            <Link to={`/read/${data._id}`}>
                                <span className='line-clamp-2 font-Josefin-Sans font-semibold leading-5 mb-3'>
                                    <h3>{data.title}  </h3>
                                </span>
                            </Link>

                            <Link to={`/read/${data._id}`}>
                                <div dangerouslySetInnerHTML={{ __html: data.content }} className='hidden md:visible md:line-clamp-4 md:font-Josefin-Sans md:font-medium md:leading-5 md:mb-3' />
                            </Link>

                            <Link to={`/profile/${data.createdBy._id}`}>
                                <span className='flex items-center'>
                                    <img
                                        className="w-6 h-6 rounded-full"
                                        src={data.createdBy.photoURL}
                                        alt="user photo"
                                    />
                                    <p className='text-sm font-bold ml-2 font-Ubuntu text-gray-700'>{data.createdBy.displayName}</p>
                                </span>
                            </Link>

                            <span className='flex justify-between my-3 '>
                                <p className='text-sm text-gray-600 font-Play font-bold'>{relativeTime}</p>
                                <BsBookmark className='text-xl mr-1 cursor-pointer'></BsBookmark>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfilePosts;