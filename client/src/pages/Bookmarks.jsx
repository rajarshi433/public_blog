import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Rightbar from '../components/rightbar/Rightbar';
import BookmarkedPosts from '../components/filteredPosts/BookmarkedPosts';

// import axios from 'axios';


const Bookmarks = () => {

    const userId = useSelector((state) => state.auth._id);
    const [bookmarks, setBookmarks] = useState([])
    const reverseBookmarks = [...bookmarks].reverse()

    useEffect(() => {
        const fetchUser = async () => {
            const result = await axios.get(`https://blogmate-api.onrender.com/fetchuser/${userId}`)
            setBookmarks(result.data.bookmarks)
        }
        fetchUser();
    }, [])


    return (
        <>
            <div className="p-4 lg:ml-16">
                <div className="p-4 mt-14">
                    <div className='grid gap-4 grid-cols-10 h-full'>
                        <div className='col-span-10 lg:col-span-7 grid gap-4 grid-cols-1'>
                            <div className='grid gap-4 grid-cols-1 mb-4 h-fit'>
                                <h2 className='font-Play text-2xl font-bold my-6'>Your Bookmarks</h2>
                                {
                                    reverseBookmarks.length === 0 ?
                                        <div className='text-xl mt-20 text-center font-bold font-Play'>No Bookmarks to Show</div> :
                                        reverseBookmarks.reverse().map(item => (

                                            <BookmarkedPosts key={item._id} data={item} />
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

export default Bookmarks;