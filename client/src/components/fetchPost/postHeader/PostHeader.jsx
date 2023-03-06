import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { BsBookmark, BsBookmarkCheckFill } from "react-icons/bs";

import Follow from './Follow';

import axios from 'axios';
import moment from 'moment';



const PostHeader = ({ data }) => {

    const [isBookmarked, setIsBookmarked] = useState(false);
    const [bookmarkData, setBookmarkData] = useState([]);
    const userId = useSelector((state) => state.auth._id);
    const postId = data._id;

    const dateString = data.createdAt;
    const format = 'D/M/YYYY, h:mm:ss a';
    const date = moment(dateString, format);
    const formattedDate = date.format('D MMMM YYYY');

    const memoizedBookmarkData = useMemo(() => {
        return bookmarkData;
    }, [bookmarkData]);

    useEffect(() => {
        const fetchBookmarks = async () => {
            const result = await axios.get(`http://localhost:8000/fetchbookmarks/${userId}`)
            setBookmarkData(result.data)
        }
        fetchBookmarks();
    }, []);

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
            axios.patch(`http://localhost:8000/removebookmark/${userId}/${postId}`)
        }
    }


    return (
        <>
            <div>
                <div className='flex flex-col md:flex-row md:justify-between gap-8 my-4 h-fit'>
                    <div className='flex md:ml-10'>
                        <Link to={`/profile/${data.createdBy._id}`}>
                            <img
                                className="w-8 h-8 rounded-full"
                                src={data.createdBy.photoURL}
                                alt="user photo"
                            />
                        </Link>
                        <div className='flex flex-col ml-2'>
                            <Link to={`/profile/${data.createdBy._id}`}>
                                <p className='text-base font-semibold'>{data.createdBy.displayName}</p>
                            </Link>
                            <p className='line-clamp-2 text-sm mb-4'>{data.createdBy.followers.length} Followers</p>
                            <Follow data={data} />
                        </div>
                    </div>
                    <div className='flex items-center self-end md:self-center mt-6 md:mt-0 h-fit md:mx-20 mx-4'>
                        {isBookmarked ? <BsBookmarkCheckFill className={data.createdBy._id === userId ? 'hidden' : 'text-xl mr-1 cursor-pointer'} onClick={bookmarkHandler}></BsBookmarkCheckFill> : <BsBookmark className={data.createdBy._id === userId ? 'hidden' : 'text-xl mr-1 cursor-pointer'} onClick={bookmarkHandler}></BsBookmark>}
                        <p className={data.createdBy._id === userId ? 'hidden' : 'ml-2 font-Mukta font-bold'}>{isBookmarked ? 'Saved' : 'Save for later'}</p>
                    </div>
                    <p className='ml-7 self-end md:self-start font-semibold -mt-6 md:hidden mr-4'>{formattedDate}</p>
                </div>
                <p className='hidden ml-20 mt-5 self-end font-semibold md:self-start md:flex'>{formattedDate}</p>
            </div>
        </>
    )
}

export default PostHeader;