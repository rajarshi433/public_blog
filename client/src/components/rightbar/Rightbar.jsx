import React from 'react';

import Copyright from './Copyright';
import ToFollow from './toFollow/ToFollow'
import TopTrends from './topTrends/TopTrends';


const Rightbar = () => {

    return (
        <div className=' lg:flex lg:flex-col rounded px-4 col-span-2 md:col-span-1 lg:col-span-1 lg:row-span-6 hidden h-[100vh]' >
            <ToFollow />
            <TopTrends />
            <Copyright />
        </div>
    )
}

export default Rightbar;