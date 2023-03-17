import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// import axios from '/node_modules/axios/dist/axios.min.js';


const Follow = ({ data }) => {

    const [isFollowed, setIsFollowed] = useState(false)
    const [followerData, setFollowerData] = useState([])
    const ferId = useSelector((state) => state.auth._id);
    const fingId = data.createdBy._id;
    const navigate = useNavigate();


    const memoizedFollowerData = useMemo(() => {
        return followerData;
    }, [followerData]);

    useEffect(() => {
        const fetchFollowings = async () => {
            if (!ferId) {
                return;
            }
            const result = await axios.get(`https://blogmate-api.onrender.com/fetchfollowing/${ferId}`)
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

        if (!ferId) {
            navigate('/login')
            return;
        }
        setIsFollowed(!isFollowed)

        if (!isFollowed) {
            await axios.patch(`https://blogmate-api.onrender.com/addfollowing/${ferId}/${fingId}`)
        }
        if (isFollowed) {
            await axios.patch(`https://blogmate-api.onrender.com/removefollowing/${ferId}/${fingId}`)
        }
    }


    return (
        <>
            <button type="button" onClick={followHandler} className={` ${data.createdBy._id === ferId ? 'hidden' : ''} py-1.5 px-4 w-fit mb-2 text-sm font-medium  focus:outline-none  rounded-full border  focus:z-10 focus:ring-4 ${isFollowed ? 'bg-black text-white hover:bg-main' : 'text-gray-900 focus:ring-gray-200 bg-white border-gray-400 hover:bg-gray-100 hover:text-blue-700'} `}>{isFollowed ? 'Following' : 'Follow'}</button>
        </>
    )
}

export default Follow;