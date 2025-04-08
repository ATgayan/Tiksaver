
import React from 'react';
import { FaMusic } from 'react-icons/fa';
import { MdOutlineDownload } from 'react-icons/md';

export default function Navbar(params) {
    return(

        <>
        {/* Navbar */}
              <nav className="w-full flex justify-between items-center px-6 py-4 max-w-5xl">
                <div className="flex items-center space-x-2 text-2xl font-bold">
                  <FaMusic className="text-pink-500" />
                  <span>Tiksavr.to</span>
                </div>
                <div className="space-x-6 text-sm hidden md:flex">
                  <a href="#" className="hover:text-pink-400">Home</a>
                  <a href="#" className="hover:text-pink-400">Language</a>
                  <a href="#" className="hover:text-pink-400">Firefox Extension</a>
                  <a href="#" className="hover:text-pink-400">FAQ</a>
                </div>
                <button className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200">Learn more</button>
              </nav>
        </>
    )
}