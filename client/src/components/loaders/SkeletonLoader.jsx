import React from 'react';

const SkeletonLoader = () => {

    return (
        <>
            <div role="status" className="animate-pulse mt-36 px-6">
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 max-w-[640px] mb-2.5 mx-auto"></div>
                <div className="h-2.5 mb-2 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 max-w-[540px]"></div>
                <div className="h-2.5 mb-2 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 max-w-[540px]"></div>
                <div className="h-2.5 mb-2 mx-auto bg-gray-300 rounded-full dark:bg-gray-700 max-w-[540px]"></div>
                <div className="flex items-center justify-center mt-4">
                    <div className="w-20 h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 mr-3"></div>
                    <div className="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
            </div>
        </>
    )
}

export default SkeletonLoader;