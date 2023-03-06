import React from 'react';
import { Link } from 'react-router-dom';


const Trends = ({ data }) => {

    return (
        <div className='mt-6'>
            <Link to={`/read/${data._id}`}>
                <p className='mx-4 mb-2 line-clamp-2 text-sm font-semibold'>{data.title}</p>
            </Link>

            <Link to={`/profile/${data.createdBy._id}`}>
                <span className='flex items-center ml-4 mt-1'>
                    <p className='mr-2 text-gray-700'>By</p>
                    <img
                        className="w-6 h-6 rounded-full"
                        src={data.createdBy.photoURL}
                        alt="user photo"
                    />
                    <p className='text-sm font-bold ml-2 font-Ubuntu text-gray-700'>{data.createdBy.displayName}</p>
                </span>
            </Link>
        </div>
    )
}

export default Trends;