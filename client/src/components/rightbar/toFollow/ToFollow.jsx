import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { RiCompass3Line } from "react-icons/ri";

import RightbarLoader from '../../Loaders/RightbarLoader';
import Profile from './Profile';

import axios from 'axios';


const ToFollow = () => {

    const id = useSelector((state) => state.auth._id);
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchUsers = async () => {
            const result = await axios.get('http://localhost:8000/fetchusers');
            setUsers(result.data)
        }
        fetchUsers();
        window.scrollTo(0, 0);
    }, [])

    if (!users.length) {
        return <RightbarLoader />
    }


    return (
        <div>
            <div className='flex items-center mt-4 mb-6'>
                <RiCompass3Line className='text-3xl mr-2'></RiCompass3Line>
                <p className='font-Play font-bold text-lg'>People Who To Follow</p>
            </div>
            {
                users.map(user => {
                    if (user._id === id) {
                        return null;
                    }
                    return <Profile key={user._id} data={user} />
                })
            }
            <hr className='bg-black h-0.5 mt-16'></hr>
        </div>
    )
}

export default ToFollow;