"use client"
import { useState } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Form from '@components/Form';
import axios from 'axios';
export default function CreatePrompt() {
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: ''
    });
    const router = useRouter();
    const { data: session } = useSession();
    const createPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await axios.post('/api/prompt/new', {
                prompt: post.prompt,
                userId: session?.user.id,
                tag: post.tag.replace('#', '')
            });
            if (res.status === 201)
                router.push('/')
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false)
        }
    }
    return (
        <Form
            type="Create"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPrompt}
        />
    )
}
