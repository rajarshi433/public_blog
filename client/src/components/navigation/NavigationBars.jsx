import React from 'react';
import { Outlet } from 'react-router-dom';

import Navigation from './Navigation';

const NavigationBars = () => {

    return (
        <>
            <Navigation />
            <Outlet />
        </>
    )
}

export default NavigationBars;