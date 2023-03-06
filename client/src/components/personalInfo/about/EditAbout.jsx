import React, { useEffect, useState } from 'react';

import axios from 'axios';


const EditAbout = ({ data }) => {

    const [about, setAbout] = useState('')

    useEffect(() => {
        setAbout(data.about);
    }, [data.about]);

    const handleInputChange = (event) => {
        setAbout(event.target.value);
    };

    const onSubmitHandler = (e) => {
        axios.put(`http://localhost:8000/addbio/${data._id}`, { about: about });
        window.location.reload();
    }


    return (
        <div className=' h-fit flex flex-col items-center gap-4'>
            <textarea onChange={handleInputChange} className='overflow-hidden resize-none w-[90%] h-[250px] border rounded-md' value={about} placeholder='Describe Yourself'></textarea>

            <div className='mt-6'>
                <button onClick={onSubmitHandler} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add Bio</button>
                <button onClick={() => { window.location.reload() }} type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Cancel</button>
            </div>
        </div>
    )
}

export default EditAbout;