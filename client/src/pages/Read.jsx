import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';

import Post from '../components/fetchPost/Post';
import Rightbar from '../components/rightbar/Rightbar';
import PostOwner from '../components/fetchPost/PostOwner';
import AssociatedPosts from '../components/filteredPosts/AssociatedPosts';
import SkeletonLoader from '../components/loaders/SkeletonLoader';

// import axios from 'axios';


const Read = () => {

    const [postInfo, setPostInfo] = useState(null)
    const { id } = useParams();
    // const uid = useSelector((state) => state.auth.uid);


    useEffect(() => {
        const fetchPostData = async () => {
            const result = await axios.get(`https://blogmate-api.onrender.com/fetchpost/${id}`)
            setPostInfo(result.data)
        }
        fetchPostData();
        window.scrollTo(0, 0);
    }, [id])

    if (!postInfo) {
        return <SkeletonLoader />
    }


    return (
        <>
            <div className="p-4 lg:ml-16">
                <div className="p-4 mt-14">
                    <div className='grid gap-4 grid-cols-10 h-full'>
                        <div className='col-span-10 lg:col-span-7 grid gap-4 grid-cols-1 h-fit'>
                            <div className='grid gap-4 grid-cols-1 mb-4 h-fit'>
                                <Post data={postInfo} />
                            </div>
                            <div className='grid grid-cols-1 gap-4'>
                                <PostOwner data={postInfo} />
                                <AssociatedPosts data={postInfo} />
                            </div>
                        </div>
                        <div className='hidden lg:flex lg:col-span-3 h-fit'>
                            <Rightbar />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Read;