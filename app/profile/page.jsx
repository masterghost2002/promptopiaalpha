"use client"
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'
import Profile from '@components/Profile';
import axios from 'axios';
const MyProfile = () => {
    const {data:session} = useSession();
    const [posts, setPosts] = useState([]);
    const router = useRouter();
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get(`/api/users/${session?.user.id}/posts`);
                const data = await res.data;
                setPosts(data)
            } catch (error) {
                console.log(error);
            }

        };
        if(session?.user.id)
            fetchPost();
    }, [session]);

    const handleDelete = async (postId) => {
        const hasConfirmed = confirm('Are you sure want to delete this prompt?');
        if(!hasConfirmed) return;
        try {
            await axios.delete(`/api/prompt/${postId}`);
            const filteredPost = posts.filter(post=>post._id !== postId);
            setPosts(filteredPost);
        } catch (error) {
            console.log(error);
        }
    }
    const handleEdit = (postId) => {
        router.push(`/update-prompt?id=${postId}`);
    }
    return (
        <Profile
            name="My"
            desc="Welcome to your presonalized profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile