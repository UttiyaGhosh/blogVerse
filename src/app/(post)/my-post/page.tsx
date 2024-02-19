'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export type blogType = {
  _id:string,
  title:string,
  content:TrustedHTML,
  userName:string,
  createdDate:string,
  summary:string
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
      <div className="flex flex-col items-center">
        {
          blogs.map((blog,index)=>(
            <div key={index} className="w-2/3 m-2 p-2 rounded-md border-b">
              <div className="flex">
                  <p> Created on <strong> {blog.createdDate} </strong></p>
                  <FontAwesomeIcon className="mx-4 my-0.5" icon={faEdit} />
                  <FontAwesomeIcon className="mx-2 my-0.5" icon={faTrashAlt} onClick={()=>handleDelete(blog._id)}/>
              </div>
              <h1 className="text-2xl my-2">{blog.title}</h1>
              <div className="">{blog.summary}</div>
              <p className=" inline-block bg-amber-700 min-w-max p-2 rounded-xl my-2 text-white">Programming</p>
            </div>
          ))
        }
      </div>
    );
}
