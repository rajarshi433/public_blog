import React from 'react';

import Follower from './fetchFollowers/Follower';


const Followers = ({ data }) => {

    return (
        <>
            <p className='mt-8 text-lg font-semibold'>~ {data.followers.length} Followers ~</p>
            <div className='md:grid md:grid-cols-2 gap-4 h-fit mt-8'>
                {
                    data.followers.map((item) => (
                        <Follower key={item._id} data={item} />
                    ))
                }
            </div>
        </>
    )
}

export default Followers;