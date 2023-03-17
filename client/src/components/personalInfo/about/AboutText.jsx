import React from 'react';

import SkeletonLoader from '../../loaders/SkeletonLoader'


const AboutText = ({ data }) => {

    if (!data) {
        return <SkeletonLoader />
    }


    return (
        <>
            {
                data.about.length <= 0 ? <div className='text-xl text-center font-bold font-Play'>No Bio</div> : <div className='text-md text-center font-Josefin-Sans'>{data.about}</div>
            }
        </>
    )
}

export default AboutText;