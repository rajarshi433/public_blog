import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Rightbar from '../components/rightbar/Rightbar';
import About from '../components/personalInfo/about/About';
import Followings from '../components/personalInfo/Followings';
import Followers from '../components/personalInfo/Followers';
import ProfileInfo from '../components/personalInfo/ProfileInfo';
import ProfilePosts from '../components/filteredPosts/ProfilePosts';
import SkeletonLoader from '../components/loaders/SkeletonLoader';

// import axios from 'axios';


const Profile = () => {

    const [active, setActive] = useState("about");
    const [userInfo, setUserInfo] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        setActive('about');
        const fetchUserData = async () => {
            const result = await axios.get(`https://blogmate-api.onrender.com/fetchuser/${id}`)
            setUserInfo(result.data)
        }
        fetchUserData();

        const fetchPosts = async () => {
            const result = await axios.get(`https://blogmate-api.onrender.com/fetchuserposts/${id}/${0}/${0}`)
            setUserPosts(result.data.posts)
        }
        fetchPosts();
    }, [id])

    const renderContent = () => {
        if (active === 'about') {
            return <About data={userInfo} />;
        }
        else if (active === 'following') {
            return <Followings data={userInfo} />;
        }
        else if (active === 'posts') {
            if (!userPosts) {
                return <h3>Loading...</h3>
            }
            if (userPosts.length == 0) {
                return <div className='text-xl mt-20 text-center font-bold font-Play'>No Posts to Show</div>
            }
            return (
                userPosts.map(post => (
                    post.createdBy._id === id &&
                    <ProfilePosts key={post._id} data={post} />
                ))
            )
        }
        else if (active === 'followers') {
            return <Followers data={userInfo} />;
        }
    };

    if (!userInfo) {
        return <SkeletonLoader />
    }


    return (
        <>
            <div className="md:p-4 lg:ml-16">
                <div className="p-4 mt-14">
                    <div className='grid gap-4 grid-cols-10 h-full'>
                        <div className='col-span-10 lg:col-span-7 grid gap-4 grid-cols-1'>
                            <div className='grid gap-4 grid-cols-1 mb-4 h-fit'>

                                <ProfileInfo data={userInfo} setActive={setActive} />

                                <div className='flex gap-6 text-lg font-Play font-semibold h-fit justify-center my-8'>
                                    <button onClick={() => setActive('posts')} className={active == "posts" ? 'underline underline-offset-4' : ""}>Posts ({userPosts.length})</button>
                                    <button onClick={() => setActive('about')} className={active == "about" ? 'underline underline-offset-4' : ""}>About</button>
                                    <button onClick={() => setActive('following')} className={active == "following" ? 'underline underline-offset-4' : ""}>Following ({userInfo.following.length})</button>
                                </div>
                                <div>
                                    {renderContent()}
                                </div>
                            </div>
                        </div>
                        <div className='hidden lg:flex lg:col-span-3'>
                            <Rightbar />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;