'use client'
import { useEffect, useState } from 'react';
import Editor from '@/components/Editor';
import axios from 'axios';
import Link from 'next/link';

export type singleBlogType = {
    _id:string,
    title:string,
    userName:string,
    createdDate:string,
    summary:string,
    category:string
  }

export default function Home ({ params }: { params: { blogId: string } }) {
    const [blog, setBlog] = useState<singleBlogType>();
    const [content, setContent] = useState('');

    const blogId = params.blogId
    const serverUrl = "https://blog-verse-server.vercel.app"

    
    useEffect(()=>{
    axios.get(`${serverUrl}/api/blogs/?id=${blogId}`)
        .then(response => {
            const blog:singleBlogType = response.data[0]
            console.log(blog)
            setBlog(blog)
            setContent(blog.summary)
        })
        .catch(error => {
            console.error('Error:', error);
        });
    },[])
      
    // const handlePublish = ()=>{
    //     if(!content){
    //         alert('Enter a content')
    //         return
    //     }

    //     const editBlogBody ={
    //         title: title,
    //         body: content,
    //         createdBy: 'User1',
    //         category: category
    //     }

    //     axios.post('http://localhost:3002/blogs/add', addBlogBody , {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         })
    //         .then(response => {
    //             console.log('Response:', response.data);
    //             setTitle('')
    //             setContent('')
    //         })
    //         .catch(error => {
    //             console.error('Error:', error);
    //         });
    // }

    return (
        <div className='flex flex-col justify-center'>
            <div className='flex'>
                <div className='w-1/6'></div>
                <div className='flex w-5/6'>
                    <p className='my-4 w-4/5 text-4xl'>
                        Title: <strong className='text-amber-700'> {blog && blog.title}</strong>
                    </p>
                </div>
            </div>
            <div className='flex'>
                <div className='w-1/6'></div>
                <div className='flex w-5/6'>
                    <p className='mb-4 w-4/5 text-2xl'>
                        Category: 
                            <strong className='text-amber-700 ml-2'> 
                                {blog && blog.category[0].toUpperCase() + blog.category.substring(1)}
                            </strong>
                    </p>
                </div>
            </div>
            <div className='p-4'>
                {blog && blog.summary}
            </div>
        </div>
    );
};