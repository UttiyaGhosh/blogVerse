'use client'
import { useState } from 'react';
import Editor from '@/components/Editor';
import axios from 'axios';
import Category from '@/components/Category';

export default function Home () {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const serverUrl = process.env.SERVER_URL

    const handlePublish = ()=>{
        if(!title){
            alert('Enter a title')
            return
        }
        if(!content){
            alert('Enter a content')
            return
        }
        
        if(category === 'other'){
            alert('Enter new category')
            return
        }

        axios.get(`${serverUrl}/api/categories?createNew=true&name=${category}`)
            .then(response => {
                console.log('Response:', response.data);
                
                const addBlogBody ={
                    title: title,
                    body: content,
                    createdBy: 'User1',//Sudarsh change to actual userName
                    category: category
                }

                axios.post(
                    `${serverUrl}/api/blogs/add`, 
                    addBlogBody , 
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
                .then(response => {
                    console.log('Response:', response.data);
                    setTitle('')
                    setContent('')
                })
                .catch(error => {
                    console.error('Error:', error);
                });

            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
        <div className='flex flex-col justify-center'>
            <div className='flex'>
                <div className='w-1/6'></div>
                <div className='flex w-5/6'>
                    <input 
                        id='title' 
                        placeholder='Enter Title' 
                        value={title} 
                        className='border-b my-4 w-4/5 text-4xl' 
                        onChange={(e)=>setTitle(e.target.value)}>
                    </input>
                    <button 
                        type="submit" 
                        className="w-1/10 h-1/2 m-4 rounded bg-green-600 active:bg-green-700 p-2 text-sm text-white shadow-md shadow-gray-400"
                        onClick={handlePublish}>
                        Publish
                    </button>
                </div>
            </div>
            <div className='flex'>
                <Category category={category} setCategory={setCategory}/>
                <div className='w-4/5 '>
                    <Editor content={content} setContent={setContent}/>
                </div>
            </div>
        </div>
    );
};