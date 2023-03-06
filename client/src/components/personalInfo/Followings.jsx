import React from 'react';

import Following from './fetchFollowings/Following';
import SkeletonLoader from '../Loaders/SkeletonLoader';


const Followings = ({ data }) => {

    if (!data) {
        return <SkeletonLoader />
    }


    return (
        <>
            <p className='mt-8 text-lg font-semibold'>~ {data.following.length} Following ~</p>
            <div className='md:grid md:grid-cols-2 gap-4 h-fit mt-8'>
                {
                    data.following.map(item => (
                        <Following data={item} key={item._id} />
                    ))
                }
            </div>
        </>
    )
}

export default Followings;