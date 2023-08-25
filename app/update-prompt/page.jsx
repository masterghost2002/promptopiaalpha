"use client"
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';
import axios from 'axios';
export default function UpdatePrompt() {
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    });

    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');
    const updatePrompt = async (e) => {
        e.preventDefault();
        if(!promptId) alert('No prompt id is provided')
        setSubmitting(true);
        try {
            const res = await axios.patch(`/api/prompt/${promptId}`, {
                prompt: post.prompt,
                tag: post.tag
            });
            if (res.status === 200)
                router.push('/');
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false)
        }
    }
    useEffect(()=>{
        const getPrompt = async ()=>{
            const res = await axios.get(`/api/prompt/${promptId}`);
            const data = await res.data;
            setPost(data);
        }
        if(promptId)
        getPrompt();
    }, [promptId]);
    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    )
}
