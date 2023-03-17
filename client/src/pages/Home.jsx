import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Header from '../components/trendings/Header';
import Post from '../components/trendings/Post';
import Rightbar from '../components/rightbar/Rightbar';
import FilteredPost from '../components/filteredPosts/FilteredPost';
import Spinner from '../components/loaders/Spinner';
import EndPost from '../components/loaders/EndPost';
import SkeletonLoader from '../components/loaders/SkeletonLoader';

import InfiniteScroll from 'react-infinite-scroll-component';

import moment from 'moment';
// import axios from 'axios';


const Home = () => {

    const id = useSelector((state) => state.auth._id);
    const [randomPosts, setRandomPosts] = useState([])
    const [filteredPosts, setfilteredPosts] = useState([])
    const [reversedFilteredPosts, setReversedFilteredPosts] = useState([])
    const [skip, setSkip] = useState(0)
    const [totalPosts, setTotalPosts] = useState(0)
    const [active, setActive] = useState('suggested');

    useEffect(() => {
        const fetchPosts = async () => {
            const random = await axios.get('https://blogmate-api.onrender.com/fetchrandomposts');
            const suggestions = await axios.get(`https://blogmate-api.onrender.com/fetchfilteredposts/${skip}`);
            setfilteredPosts([...filteredPosts, ...suggestions.data.suggestedPosts])
            setReversedFilteredPosts([...suggestions.data.suggestedPosts, ...filteredPosts])
            setTotalPosts(suggestions.data.totalPosts)
            setRandomPosts(random.data)
        }


        fetchPosts();
    }, [skip])

    const fetchMorePosts = () => {
        setSkip(skip + 3)
    }

    const renderFilteredPosts = () => {
        if (active === 'suggested') {

            return (
                <InfiniteScroll
                    dataLength={filteredPosts.length}
                    next={fetchMorePosts}
                    hasMore={filteredPosts.length < totalPosts}
                    loader={<Spinner />}
                    endMessage={<EndPost />}
                >
                    {
                        filteredPosts.map(filteredPost => (
                            <FilteredPost data={filteredPost} key={filteredPost._id} />
                        ))
                    }
                </InfiniteScroll>
            )
        }

        if (active === 'following') {

            return (
                <InfiniteScroll
                    dataLength={filteredPosts.length}
                    next={fetchMorePosts}
                    hasMore={filteredPosts.length < totalPosts}
                    loader={<Spinner />}
                    endMessage={<EndPost />}>
                    {
                        filteredPosts.map(filteredPost => filteredPost.createdBy.followers.includes(id) && (
                            <FilteredPost data={filteredPost} key={filteredPost._id} />
                        ))
                    }
                </InfiniteScroll>
            )
        }

        if (active === 'new') {

            return (
                <InfiniteScroll
                    dataLength={filteredPosts.length}
                    next={fetchMorePosts}
                    hasMore={filteredPosts.length < totalPosts}
                    loader={<Spinner />}
                    endMessage={<EndPost />}>
                    {
                        reversedFilteredPosts.map(filteredPost => moment(filteredPost.createdAt, 'D/M/YYYY, h:mm:ss a').isAfter(moment().subtract(3, 'days')) && (
                            <FilteredPost data={filteredPost} key={filteredPost._id} />
                        ))
                    }
                </InfiniteScroll>
            )
        }
    }

    if (!randomPosts || filteredPosts.length === 0) {
        return <SkeletonLoader />
    }


    return (
        <>
            <div className="p-4 lg:ml-16">
                <div className="md:p-4 mt-14">

                    <Header />

                    <div className='grid gap-4 grid-cols-10 h-full'>
                        <div className='col-span-10 lg:col-span-7 grid gap-4 grid-cols-1'>
                            <div className='grid gap-4 grid-cols-1 md:grid-cols-2 mb-4'>
                                {
                                    randomPosts.map(randomPost => (
                                        <Post data={randomPost} key={randomPost._id} />
                                    ))
                                }
                            </div>
                            <div className='grid grid-cols-1'>
                                <div className='flex flex-col'>
                                    <hr className='bg-black h-[3px] mb-8'></hr>
                                    <div className="flex items-center h-full mb-4 roundedcol-span-2 lg:col-span-2 lg:row-span-1">
                                        <button onClick={() => setActive('suggested')} type="button" className={`py-2 px-4 w-fit mr-3 mb-2 text-sm font-medium  focus:outline-none  rounded-full border border-gray-400 ${active === 'suggested' ? 'bg-black text-white border-none py-2' : 'bg-white text-gray-900 '}`}>Suggested</button>

                                        <button onClick={() => setActive('following')} type="button" className={`py-2 px-4 w-fit mr-3 mb-2 text-sm font-medium  focus:outline-none  rounded-full border border-gray-400 ${active === 'following' ? 'bg-black text-white border-none' : 'bg-white text-gray-900 '}`}>Following</button>

                                        <button onClick={() => setActive('new')} type="button" className={`py-2 px-4 w-fit mr-3 mb-2 text-sm font-medium  focus:outline-none  rounded-full border border-gray-400 ${active === 'new' ? 'bg-black text-white border-none' : 'bg-white text-gray-900 '}`}>New</button>
                                    </div>
                                </div>
                                {
                                    renderFilteredPosts()
                                }
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

export default Home;