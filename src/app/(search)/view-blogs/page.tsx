'use client'
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { blogType } from "../my-blog/page";
import { SearchContext } from "@/contexts/SearchContext";
import Link from "next/link";

export default function Home() {
  const [blogs, setBlogs] = useState<blogType[]>([]);
  const {searchQuery, setSearchQuery} = useContext(SearchContext);
  const serverUrl = "https://blog-verse-server.vercel.app"

  useEffect(()=>{
    console.log(serverUrl)
    const searchUrl = searchQuery.length>=3?`${serverUrl}/api/blogs/?searchQuery=${searchQuery}`:`${serverUrl}/api/blogs`
    axios.get(searchUrl)
        .then(response => {
            setBlogs(response.data)
        })
        .catch(error => {
            console.error('Error:', error);
        });
    },[searchQuery])

  return (
    <div className="flex flex-col items-center">
      {
        blogs.map((blog,index)=>(
          <div key={index} className="w-2/3 m-2 p-2 rounded-md border-b">
            <div className="flex">
              <p> Created By <strong className="text-amber-700"> {blog.userName} </strong> on <strong> {blog.createdDate} </strong></p>
            </div>
            <Link href={`/show-blog/${blog._id}`}>
              <h1 className="text-2xl my-2"><u>{blog.title}</u></h1>
            </Link>
            <div className="">{blog.summary}</div>
            <p className=" inline-block bg-amber-700 min-w-max p-2 rounded-xl my-2 text-white">
              {blog.category[0].toUpperCase() + blog.category.substring(1)}
            </p>
          </div>
        ))
      }
    </div>
  );
}
