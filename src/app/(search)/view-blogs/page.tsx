'use client'
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { blogType } from "../my-blog/page";
import { SearchContext } from "@/contexts/SearchContext";
import Link from "next/link";
import Category from "@/components/Category";

export default function Home() {
  const [blogs, setBlogs] = useState<blogType[]>([]);
  const {searchQuery, setSearchQuery} = useContext(SearchContext);
  const [category, setCategory] = useState('');
  const [categoryList,setCategoryList] = useState([''])
  const serverUrl = "https://blog-verse-server.vercel.app"

  useEffect(()=>{
    axios.get(`${serverUrl}/api/categories`)
        .then(response => {
            setCategoryList(["",...response.data]);
        })
        .catch(error => {
            console.error('Error:', error);
        });
  },[])

  useEffect(()=>{
    const searchUrl = searchQuery.length>=3?
                      `${serverUrl}/api/blogs?searchQuery=${searchQuery}&category=${category}`:
                      `${serverUrl}/api/blogs?category=${category}`
    axios.get(searchUrl)
        .then(response => {
            setBlogs(response.data)
        })
        .catch(error => {
            console.error('Error:', error);
        });
    },[searchQuery,category])

  return (
    <div className="flex">
      <div className="w-1/5 pt-10">
        <Category categoryList={categoryList} setCategory={setCategory}/>
      </div>
      <div className="flex flex-col w-2/3">
        {
          blogs.map((blog,index)=>(
            <div key={index} className="m-2 p-2 rounded-md border-b">
              
              <Link href={`/show-blog/${blog._id}`}>
                <h1 className="text-2xl my-2"><u>{blog.title}</u></h1>
              </Link>
              <div className="">{blog.summary}</div>
              <div className="flex items-center gap-2">
                <p className=" inline-block bg-amber-700 min-w-max p-2 rounded-xl my-2 text-white">
                  {blog.category[0].toUpperCase() + blog.category.substring(1)}
                </p>
                <p> Created By <strong className="text-amber-700"> {blog.userName} </strong> on <strong> {blog.createdDate} </strong></p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}
