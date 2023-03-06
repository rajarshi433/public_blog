import React from 'react';

import ProfilePosts from '../filteredPosts/ProfilePosts';
import SkeletonLoader from '../Loaders/SkeletonLoader';


const Posts = ({ data }) => {

    if (!data) {
        return <SkeletonLoader />
    }


    return (
        <>
            <div className='mt-8'>
                {
                    data.map(post => (
                        <ProfilePosts key={post._id} data={post} />
                    ))
                }
            </div>
        </>
    )
}

export default Posts;