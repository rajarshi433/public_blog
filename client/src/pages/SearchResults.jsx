import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Rightbar from '../components/rightbar/Rightbar';
import Header from '../components/trendings/Header';
import FilteredPost from '../components/filteredPosts/FilteredPost';

import axios from 'axios';


const SearchResults = () => {

    const { query } = useParams();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const results = await axios.get(`http://localhost:8000/search/${query}`);
            setPosts(results.data)
        }
        fetchPosts();
    }, [query])


    return (
        <>
            <div className="p-4 lg:ml-16">
                <div className="p-4 mt-14">
                    <Header />
                    <div className='grid gap-4 grid-cols-10 h-full'>
                        <div className='col-span-10 lg:col-span-7 grid gap-4 grid-cols-1'>
                            <div className='grid gap-4 grid-cols-1 mb-4 h-fit'>
                                <h2 className='font-Play text-2xl font-bold my-6'>{posts.length == 0 ? 'No' : ' Showing'} results for - <span className='font-normal text-xl'>{query}</span>  </h2>
                                {
                                    posts.map(post => (
                                        <FilteredPost key={post._id} data={post} />
                                    ))
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

export default SearchResults;