import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Rightbar from '../components/rightbar/Rightbar';
import CreatedPosts from '../components/filteredPosts/CreatedPosts';
import Spinner from '../components/Loaders/Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';

import axios from 'axios';


const MyPosts = () => {

    const id = useSelector((state) => state.auth._id);
    const [posts, setPosts] = useState([]);
    const [skip, setSkip] = useState(0)
    const [totalPosts, setTotalPosts] = useState(0)

    useEffect(() => {
        const fetchMyPosts = async () => {
            const result = await axios.get(`http://localhost:8000/fetchuserposts/${id}/${3}/${skip}`)
            setPosts([...posts, ...result.data.posts])
            setTotalPosts(result.data.totalPosts)
        }
        fetchMyPosts();
    }, [skip])

    const fetchMorePosts = () => {
        setSkip(skip + 3)
    }


    return (
        <>
            <div className="p-4 lg:ml-16">
                <div className="p-4 mt-14">
                    <div className='grid gap-4 grid-cols-10 h-full'>
                        <div className='col-span-10 lg:col-span-7 grid gap-4 grid-cols-1'>
                            <div className='grid gap-4 grid-cols-1 mb-4 h-fit'>
                                <h2 className='font-Play text-2xl font-bold my-6'>Your Posts</h2>
                                <InfiniteScroll
                                    dataLength={posts.length}
                                    next={fetchMorePosts}
                                    hasMore={posts.length < totalPosts}
                                    loader={<Spinner />}
                                >
                                    {
                                        posts.length === 0 ?
                                            <div className='text-xl mt-20 text-center font-bold font-Play'>No Posts Created</div> :
                                            posts.map(post => (
                                                <CreatedPosts key={post._id} data={post} />
                                            ))
                                    }
                                </InfiniteScroll>
                            </div>
                        </div>
                        <div className='hidden lg:flex lg:col-span-3'>
                            <Rightbar />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MyPosts;