'use client'
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import clsx from 'clsx';
import axios from "axios";

export type CategoryPropType = {
    category:string
    setCategory: Dispatch<SetStateAction<string>>
}

export default function Category ({ category, setCategory }: CategoryPropType) {
    const [newCategory, setNewCategory] = useState('');
    const [categoryList,setCategoryList] = useState([''])
    const serverUrl = process.env.SERVER_URL
    
    useEffect(()=>{
        axios.get(`${serverUrl}/api/categories`)
            .then(response => {
                console.log(response.data)
                setCategoryList(response.data);
                setCategory(response.data[0])
            })
            .catch(error => {
                console.error('Error:', error);
            });
    },[])

    const handleCategory = (e:ChangeEvent<HTMLSelectElement>) => {
        const selectedCategory = e.target.value
        if(selectedCategory === 'other')
            setNewCategory('')
        setCategory(selectedCategory);
    };

    const handleNewCategorySubmit = ()=>{
        setCategory(newCategory)
    }

    return (
        <div className='w-1/6 pl-2'>
            <p className='text-xl text-amber-700'>Choose Category...</p>
            <select id="categoryDropdown" className='border border-gray-600 rounded-md mt-4 p-2' onChange={handleCategory}>
                {
                    categoryList.map((category,index) => (
                            <option key = {index} value={category}>{category}</option>
                        ))
                }
                            <option value='other'>Other</option>
            </select>
            <form onSubmit={handleNewCategorySubmit} className={clsx("flex mt-4 mr-2 justify-between",{" hidden":category !== 'other'})}>
                <input type='text' 
                className="w-3/5 border-b border-gray-300"
                value={newCategory} 
                placeholder="Enter Category" 
                onChange={e=>{setNewCategory(e.target.value)}}/>
                <button type="submit" className="w-1/3 rounded bg-green-600 active:bg-green-700 p-1 text-white text-sm shadow-md shadow-gray-400">
                    Add
                </button>
            </form>
            
        </div>
    )
}