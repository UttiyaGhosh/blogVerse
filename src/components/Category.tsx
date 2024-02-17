'use client'
import { useState } from "react";

export type EditorPropType = {
    content:string
    setContent: Dispatch<SetStateAction<string>>
}

export default function Category () {
    const categoryList = ['Frameworks', 'programming', 'tools', 'Software Engineering', 'Interview Preparation'];
    const [selectedCategory, setSelectedCategory] = useState(categoryList[0]);

    const handleCategoryClick = (category:string) => {
        setSelectedCategory(category);
    };

    return (<div className='mt-4'>
    {categoryList.map(category => (
        <p key={category} className={`inline-block text-center text-sm px-1 py-2 m-1 rounded-2xl border cursor-pointer ${selectedCategory === category ? 'bg-black text-white' : 'border-black'}`} onClick={() => handleCategoryClick(category)}>{category}</p>
    ))}
    </div>)
}