import React, { useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import SkeletonLoader from '../components/Loaders/SkeletonLoader';

import JoditEditor from 'jodit-react';
import axios from "axios";


const CreatePost = () => {

    const editor = useRef(null)
    const uid = useSelector((state) => state.auth.uid);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [banner, setBanner] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [wait, setWait] = useState(false);

    const createNewPost = async (e) => {
        setWait(true);
        e.preventDefault();

        const data = new FormData();
        data.set('title', title);
        data.set('content', content);
        data.set('banner', banner[0]);
        data.set('createdBy', uid);

        const result = await axios.post('http://localhost:8000/addpost', data);
        if (result.statusText === 'OK') {
            setWait(false);
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to='/' />
    }
    if (wait) {
        return <SkeletonLoader />
    }


    return (
        <>
            <div className="p-4 lg:ml-16">
                <div className="p-4 mt-14">

                    <h2 className='text-center font-Play font-semibold text-2xl mb-10'>Create your story...</h2>

                    <div className='grid gap-4 grid-cols-10 h-full'>
                        <div className=' h-fit w-full col-span-10'>
                            <form onSubmit={createNewPost}>

                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Ttile</label>
                                <div className="mt-1">
                                    <input value={title} onChange={e => setTitle(e.target.value)} type='text' id="title" name="title" className="resize-none mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Title goes here" required></input>
                                </div>

                                <label htmlFor='image-upload' className="mt-6 mb-2 block text-sm font-medium text-gray-700">Select a banner</label>
                                <input type="file" onChange={e => setBanner(e.target.files)} id='image-upload' name='banner' accept="image/*" className='rounded-md' required></input>

                                <label htmlFor='body' className="mt-6 mb-2 block text-sm font-medium text-gray-700">Body</label>
                                <JoditEditor ref={editor} value={content} tabIndex={1} onChange={newValue => setContent(newValue)} />

                                <button type="submit" className="mt-8 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Create</button>

                            </form>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default CreatePost;