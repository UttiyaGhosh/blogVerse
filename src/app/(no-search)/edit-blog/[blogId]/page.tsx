'use client'
import { useEffect, useState } from 'react';
import Editor from '@/components/Editor';
import axios from 'axios';
import { singleBlogType } from '../../show-blog/[blogId]/page';

export default function Home ({ params }: { params: { blogId: string } }) {
    const [blog, setBlog] = useState<singleBlogType>();
    const [content, setContent] = useState('');
    const [message, setMessage] = useState('');

    const blogId = params.blogId
    const serverUrl = "https://blog-verse-server.vercel.app"

    
    useEffect(()=>{
        axios.get(`${serverUrl}/api/blogs/${blogId}`)
        .then(response => {
            const blog:singleBlogType = response.data
            console.log(blog)
            setBlog(blog)
            setContent(blog.body)
            
        })
        .catch(error => {
            console.error('Error:', error);
        });
    },[])
      
    const handleUpdate = ()=>{
        if(!content){
            alert('Enter a content')
            return
        }

        axios.put(
            `${serverUrl}/api/blogs/${blogId}`, 
            {
                body:content
            } , 
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                console.log('Response:', response.data);
                setMessage('Updated Successfully!')
            })
            .catch(error => {
                setMessage('Update Error!')
                console.error('Error:', error);
            });
    }

    return (
        <div className='flex flex-col justify-center'>
            <div className='flex'>
                <div className='w-1/6'></div>
                <div className='flex w-5/6 items-center'>
                    <p className='my-4 w-4/5 text-4xl'>
                        Title: <strong className='text-amber-700'> {blog && blog.title}</strong>
                    </p>
                    <button 
                        type="submit" 
                        className="w-1/10 h-1/2 m-4 rounded bg-green-600 active:bg-green-700 p-2 text-sm text-white shadow-md shadow-gray-400"
                        onClick={handleUpdate}
                        >
                        Save
                    </button>
                    <p>{message}</p>
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
            <div className='flex justify-center'>
                <div className='w-11/12 '>
                    <Editor content={content} setContent={setContent}/>
                </div>
            </div>
        </div>
    );
};