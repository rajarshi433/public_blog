import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import axios from 'axios';


const Follower = ({ data }) => {

    const [isFollowed, setIsFollowed] = useState(false)
    const [followerData, setFollowerData] = useState([])
    const fingId = data._id;
    const ferId = useSelector((state) => state.auth._id);

    const memoizedFollowerData = useMemo(() => {
        return followerData;
    }, [followerData]);

    useEffect(() => {
        const fetchFollowings = async () => {
            if (!ferId) {
                return;
            }
            const result = await axios.get(`http://localhost:8000/fetchfollowing/${ferId}`)
            setFollowerData(result.data);
        }
        fetchFollowings();
    }, [ferId])

    useEffect(() => {
        if (memoizedFollowerData.includes(fingId)) {
            setIsFollowed(true);
        }
        else {
            setIsFollowed(false);
        }
    }, [memoizedFollowerData])

    const followHandler = async (e) => {
        e.preventDefault();
        setIsFollowed(!isFollowed)

        if (!isFollowed) {
            await axios.patch(`http://localhost:8000/addfollowing/${ferId}/${fingId}`)
        }
        if (isFollowed) {
            await axios.patch(`http://localhost:8000/removefollowing/${ferId}/${fingId}`)
        }
    }


    return (
        <>
            <div className='flex items-center mb-3'>
                <div className='flex'>
                    <img
                        className="w-12 h-12 rounded-full"
                        src={data.photoURL}
                        alt="user photo"
                    />
                    <Link to={`/profile/${data._id}`}>
                        <div className='flex flex-col ml-2'>
                            <p className='text-base font-semibold'>{data.displayName}</p>
                            <p className='line-clamp-2 text-sm '>{data.about}</p>
                        </div>
                    </Link>
                </div>
                <button type="button" onClick={followHandler} className={` ${data._id === ferId ? 'hidden' : ''} py-1.5 px-4 w-fit mb-2 text-sm font-medium  focus:outline-none  rounded-full border  focus:z-10 focus:ring-4 ${isFollowed ? 'bg-black text-white hover:bg-main' : 'text-gray-900 focus:ring-gray-200 bg-white border-gray-400 hover:bg-gray-100 hover:text-blue-700'} `}>{isFollowed ? 'Following' : 'Follow'}</button>
            </div>
        </>
    )
}

export default Follower;