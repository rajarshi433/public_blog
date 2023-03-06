import React from 'react';

const PostOwner = ({ data }) => {
    return (
        <>
            <div>
                <hr className='bg-black h-[1.5px] mb-8'></hr>
                <h3 className='font-Josefin-Sans font-bold text-2xl mb-4'>More From {data.createdBy.displayName}</h3>
            </div>
        </>
    )
}

export default PostOwner;