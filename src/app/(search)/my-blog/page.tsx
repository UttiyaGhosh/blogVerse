'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from "next/link";

export type blogType = {
  _id:string,
  title:string,
  userName:string,
  createdDate:string,
  summary:string,
  category:string
}

export default function Home() {
  const [blogs, setBlogs] = useState<blogType[]>([]);
  const userId = "65cceadebbed8dce9c357bb6" //Sudarsh change with actual userId

  const fetchData = () =>{
    axios.get(`http://localhost:3002/blogs/?createdBy=${userId}`)
        .then(response => {
            console.log(response.data)
            setBlogs(response.data)
        })
        .catch(error => {
            console.error('Error:', error);
        });
  } 

  useEffect(()=>{
    fetchData()
  },[])

  const handleDelete = async (blogId:string) =>{
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");

    if (confirmDelete) {
        try{
          await axios.post(`http://localhost:3002/blogs/delete/${blogId}`)
          fetchData()
        }catch (error) {
          console.error('Error:', error);
        }
      }
    }

    return (
      <div>
        <div className="flex mt-2 mr-4 justify-end">
          <Link href="/new-blog" className="rounded bg-green-600 active:bg-green-700 p-2 text-sm text-white shadow-md shadow-gray-400">
                Add New
          </Link>
        </div>
        <div className="flex flex-col items-center">
          {
            blogs.map((blog,index)=>(
              <div key={index} className="w-2/3 m-2 p-2 rounded-md border-b">
                <div className="flex">
                    <p> Created on <strong> {blog.createdDate} </strong></p>
                    <Link href={`/edit-blog/${blog._id}`}>
                      <FontAwesomeIcon className="mx-4 my-0.5" icon={faEdit} />
                    </Link>
                    <FontAwesomeIcon className="mx-2 my-0.5" icon={faTrashAlt} onClick={()=>handleDelete(blog._id)}/>
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
      </div>
    );
}
