'use client'

import React, { useState ,useRef} from "react";
import { MdOutlineDownload } from "react-icons/md";
import Skeleton from '@mui/material/Skeleton';



import { motion } from "framer-motion";
import Navbar from "./Components/Navbar";

import {gsap} from "gsap";
import { LoaderCircle } from 'lucide-react';


export default function Ui() { 

  const inputRef = useRef(null);
  const [videoUrl, setVideoUrl] = useState(" ");

  const [videocover, setVideocover] = useState(null);
  const [videodownloadurl, setVideodownloadurl] = useState(null);
  const [videoname, setvideoname] = useState('Tiksavr');
  
  const [Coverloading, setcoverLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const haddlechange = (data) => {
    setVideoUrl(data.target.value);


  };
  const handleSubmit = (e) => {

    e.preventDefault();
    // Check if the URL is empty or invalid
    if (videoUrl.trim() === "") {
      inputRef.current.classList.remove("placeholder-gray-600");
      inputRef.current.classList.add("placeholder-red-500");

      return;
    }else{
      
      setcoverLoading(true);
    }


    // Handle the form submission logic here
    fetch(`/api/fetchvideo`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: videoUrl,
        }),
      }

    )
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          // Handle the video URL (e.g., download it or display it)
          console.log("Video URL:", data.videoUrl);
          setVideocover(data.videoUrl.dynamic_cover);
          setcoverLoading(false);
          setVideodownloadurl(data.videoUrl.noWatermark
            );
        } else {
          console.error("Error fetching video:", data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };



     const hadleName = (e) =>{
      const name = e.target.value;
      setvideoname(name);

     }


  const handleDownload = async (url) => {
    setIsDownloading(true);
    // Check if the URL is empty or invalid
    try {
        // Check if the URL is accessible
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('File not found or inaccessible');
        }

        const blob = await response.blob();
        const urls = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = urls;
        a.download = videoname;
        document.body.appendChild(a);

        a.click();

        URL.revokeObjectURL(urls); // Clean up the URL object
        document.body.removeChild(a); // Remove the anchor element
    } catch (error) {
        alert(error.message);
    }
    setIsDownloading(false);
};

  return (
    <>
      {/* Navbar */}
      <div className=" flex items-center justify-center bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-4">
        <Navbar />
      </div>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">



        {/* Main Content */}
        <div className="text-center">
          <h1 className="text-4xl  md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-300">
            Download TikTok Video by Link!
          </h1>
          
        </div>

       
        {/* Input & Button */}
        <div className="mt-8 w-full max-w-md relative m-10">
        
          <input
           ref={inputRef}
            onChange={haddlechange}
            type="text"
            placeholder="Paste link here!"
            className="w-full p-3 rounded-full bg-white text-gray-900 text-lg focus:outline-non placeholder-gray-600" />
          <motion.button
           
           onClick={handleSubmit} className=" 
            absolute right-1 top-1 bottom-1 px-6 bg-gradient-to-r from-pink-500 to-orange-400 text-white font-bold rounded-full hover:opacity-90">
              {Coverloading ? <LoaderCircle className="animate-spin"/>:'Find'}
              
          </motion.button>
         


        </div>
        
       
        <div className=" flex flex-row items-center justify-between mt-10 w-fit">
         
          {Coverloading ? 
            <Skeleton variant="rectangular" width={210} height={118} />:
            <div className="flex items-center justify-center w-[250px] h-[300px] border-amber-50">
            <img src={videocover} alt="" className="w-full h-full" />
            </div>
            }

          <div className="flex flex-col justify-center items-center gap-2">
          <input onChange={hadleName} type="text" id="first_name" className="m-5 w-[200px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter file name" required />



<button onClick={() => handleDownload(videodownloadurl)} className="w-fit bg-gradient-to-r from-pink-500 to-orange-400 text-white font-bold rounded-full px-4 py-2 hover:opacity-90 flex items-center gap-2">
           {isDownloading ? <LoaderCircle className="animate-spin"/>: ' Donwload'}
           
          </button>
          </div>
            
             </div>
      </div>
    </>
  )
}