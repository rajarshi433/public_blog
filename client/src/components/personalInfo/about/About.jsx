import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { TbEdit } from "react-icons/tb";

import AboutText from './AboutText';
import EditAbout from './EditAbout';

import moment from 'moment';


const About = ({ data }) => {

    const userId = useSelector((state) => state.auth._id);
    const [showAbout, setShowAbout] = useState(true)

    const dateString = data.joinedOn;
    const format = 'D/M/YYYY, h:mm:ss a';
    const date = moment(dateString, format);
    const formattedDate = date.format('D MMMM YYYY');

    const renderContent = () => {
        if (showAbout) {
            return <AboutText data={data} />
        }
        else {
            return <EditAbout data={data} />
        }
    }


    return (
        <>
            <div className=' md:grid md:grid-cols-2 h-fit mt-8'>
                <div className='flex flex-col'>

                    {renderContent()}

                    <TbEdit onClick={(e) => { e.preventDefault(); setShowAbout(false) }} className={`${userId === data._id ? '' : "hidden"} ${showAbout ? '' : 'hidden'} text-3xl mx-auto mt-10 cursor-pointer`}></TbEdit>
                </div>
                <p className='text-center text-xl font-Play mt-6 md:mt-0'>
                    Joined on {formattedDate}
                </p>
            </div>
        </>
    )
}

export default About;