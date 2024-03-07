'use client'
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import clsx from 'clsx';

export type CategoryPropType = {
    categoryList:string[]
    setCategory: Dispatch<SetStateAction<string>>
}

export default function Category ({ categoryList, setCategory }: CategoryPropType) {
    const [newCategory, setNewCategory] = useState('');
    const [showAddCategory,setShowAddCategory] = useState(false)
    const [categories, setCategories] = useState<string[]>([]);
    const serverUrl = "https://blog-verse-server.vercel.app"    

    useEffect(() => {
        setCategories(categoryList);
    }, [categoryList]);

    const handleCategory = (e:ChangeEvent<HTMLSelectElement>) => {
        const selectedCategory = e.target.value
        setShowAddCategory(selectedCategory === 'other')
        setCategory(selectedCategory);
    };

    const handleNewCategorySubmit = async (event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        axios.post(
            `${serverUrl}/api/categories`, 
            {
                "name": newCategory
            }, 
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        .then(response => {
            setCategories(prevCategories=>[...prevCategories.slice(0,-1),response.data.name,...prevCategories.slice(-1)]);
            setCategory(response.data.name)
            setNewCategory('')
            setShowAddCategory(false)
        })
        .catch(error => {
            console.error('Error:', error);
        });
        
    }

    return (
        <div className=' pl-2'>
            <p className='text-xl text-amber-700'>Choose Category...</p>
            <select id="categoryDropdown" className='border border-gray-600 rounded-md mt-4 p-2' onChange={handleCategory} >
                {
                    categories.map((category,index) => (
                            <option key = {index} value={category}>{category==""?"All":category}</option>
                        ))
                }
            </select>
            <form onSubmit={handleNewCategorySubmit} className={clsx("flex mt-4 mr-2 justify-between",{" hidden":!showAddCategory})}>
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