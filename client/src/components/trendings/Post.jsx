import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { BsBookmark, BsBookmarkCheckFill } from "react-icons/bs";

import axios from 'axios';
import moment from 'moment';


const Post = ({ data }) => {

    const [isBookmarked, setIsBookmarked] = useState(false);
    const [bookmarkData, setBookmarkData] = useState([]);
    const userId = useSelector((state) => state.auth._id);
    const postId = data._id;

    const dateString = data.createdAt;
    const format = 'D/M/YYYY, h:mm:ss a';
    const now = moment();
    const date = moment(dateString, format);
    const relativeTime = date.from(now);

    const memoizedBookmarkData = useMemo(() => {
        return bookmarkData;
    }, [bookmarkData]);

    useEffect(() => {
        if (!userId) {
            return;
        }
        const fetchBookmarks = async () => {
            const result = await axios.get(`http://localhost:8000/fetchbookmarks/${userId}`)
            setBookmarkData(result.data)
        }
        fetchBookmarks();
    }, [userId]);

    useEffect(() => {
        if (memoizedBookmarkData.includes(postId)) {
            setIsBookmarked(true);
        } else {
            setIsBookmarked(false);
        }
    }, [memoizedBookmarkData]);

    const bookmarkHandler = async (e) => {
        e.preventDefault();
        setIsBookmarked(!isBookmarked);

        if (!isBookmarked) {
            await axios.patch(`http://localhost:8000/addbookmark/${userId}/${postId}`)
        }
        if (isBookmarked) {
            await axios.patch(`http://localhost:8000/removebookmark/${userId}/${postId}`)
        }
    }


    return (
        <>
            <div className="flex items-stretch h-[200px] rounded md:col-span-1 lg:col-span-1 lg:row-span-1 bg-teal-100 col-span-2 p-2">
                <div className="text-2xl grid grid-cols-10 gap-3 w-full">
                    <div className='col-span-10 h-full flex flex-col justify-between text-black text-base'>
                        <Link to={`/read/${data._id}`}>
                            <span className='line-clamp-2 font-Josefin-Sans font-semibold leading-5'>
                                {data.title}
                            </span>
                        </Link>

                        <Link to={`/read/${data._id}`}>
                            <span className='text-sm line-clamp-3 text-left font-Mukta mb-4 mt-2'>
                                <p dangerouslySetInnerHTML={{ __html: data.content }} />
                            </span>
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

                        <div className='flex justify-between my-3'>
                            <p className='text-sm text-gray-600 font-Play font-bold'>{relativeTime}</p>
                            {isBookmarked ? <BsBookmarkCheckFill className={data.createdBy._id === userId ? 'hidden' : 'text-xl mr-1 cursor-pointer'} onClick={bookmarkHandler}></BsBookmarkCheckFill> : <BsBookmark className={data.createdBy._id === userId ? 'hidden' : 'text-xl mr-1 cursor-pointer'} onClick={bookmarkHandler}></BsBookmark>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Post;