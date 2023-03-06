import React from 'react';

const PostContent = ({ data }) => {
    return (
        <>
            <div className='mt-10 mb-20'>
                <h3 className='font-Play text-2xl font-bold mx-4 md:mx-20'>{data.title}</h3>
                <img src={data.banner} alt="banner" className='mx-auto mt-8 lg: w-[700px]' />
                <main dangerouslySetInnerHTML={{ __html: data.content }} className='text-justify mt-6 mx-4 md:mx-20' />
            </div>
        </>
    )
}

export default PostContent;