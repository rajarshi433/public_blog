import React from 'react';

import SkeletonLoader from '../Loaders/SkeletonLoader';


const ProfileInfo = ({ setActive, data }) => {

    if (!data) {
        return <SkeletonLoader />
    }


    return (
        <>
            <div className='flex'>
                <img
                    className="w-16 h-16 rounded-full"
                    src={data.photoURL}
                    alt="user photo"
                />
                <div className='flex flex-col ml-4 self-center'>
                    <p className='text-3xl font-semibold'>{data.displayName}</p>
                    <p className='text-lg mb-1 font-Josefin-Sans cursor-pointer w-fit' onClick={() => setActive('followers')}>{data.followers.length} Followers</p>
                </div>
            </div>
        </>
    )
}

export default ProfileInfo;