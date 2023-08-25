"use client"
import { useState, useEffect } from 'react';
import Profile from '@components/Profile';
import axios from 'axios';
const ProfilePage = ({params}) => {
    const [posts, setPosts] = useState([]);
    const [userName, setUserName] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/users/${params.id}/posts`);
                const data = await res.data;
                setPosts(data);
                setUserName(data[0].creator.username)
            } catch (error) {
                console.log(error);
            }
        };
        if(params)
            fetchData();
    }, [params]);
    return (
        <Profile
            name={userName}
            data={posts}
        />
    )
}

export default ProfilePage