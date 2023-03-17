import React, { useEffect, useState } from 'react';

import { BsLightningCharge } from "react-icons/bs";

import Trends from './Trends';
import RightbarLoader from '../../loaders/RightbarLoader';

// import axios from 'axios';


const TopTrends = () => {

    const [topics, setTopics] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
            const random = await axios.get('https://blogmate-api.onrender.com/fetchrandomposts');
            setTopics(random.data)
        }
        fetchPosts();
    }, [])

    if (topics.length == 0) {
        return <RightbarLoader />
    }


    return (
        <div>
            <div className='flex items-center mt-16'>
                <BsLightningCharge className='text-xl mr-2'></BsLightningCharge>
                <p className='font-Play font-bold text-lg'>Today's Top Trends</p>
            </div>
            {
                topics.slice(0, 4).map(item => (
                    <Trends key={item._id} data={item} />
                ))
            }
            <hr className='bg-black h-[1.5px] mt-16'></hr>
        </div>
    )
}

export default TopTrends;