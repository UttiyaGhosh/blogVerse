'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import { blogType } from "../my-blog/page";

export default function Home() {
  const [blogs, setBlogs] = useState<blogType[]>([]);

  useEffect(()=>{
    axios.get('http://localhost:3002/blogs')
        .then(response => {
            console.log(response.data)
            setBlogs(response.data)
        })
        .catch(error => {
            console.error('Error:', error);
        });
},[])

  return (
    <div className="flex flex-col items-center">
      {
        blogs.map((blog,index)=>(
          <div key={index} className="w-2/3 m-2 p-2 rounded-md border-b">
            <div className="flex">
              <p> Created By <strong className="text-amber-700"> {blog.userName} </strong> on <strong> {blog.createdDate} </strong></p>
            </div>
            <h1 className="text-2xl my-2">{blog.title}</h1>
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
