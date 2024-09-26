"use client";
import React from 'react';
import Image from 'next/image';
import logo from './../../public/logo.png';

const Navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
    return (
        <div className='flex bg-green-300 h-[70px] items-center top-0 sticky py-6 mb-0 px-5'>
            <Image
                alt='logo'
                width={40}
                height={40}
                src={logo.src}
                onClick={toggleSidebar} // This will toggle the sidebar on logo click
                className="cursor-pointer" // Add cursor pointer style
            />
            <div className='flex flex-row justify-start gap-1 z-100'>
                <p className='text-green-900 font-bold text-[24px] font-mono'>OpenGrammarly</p>
            </div>
        </div>
    );
};

export default Navbar;
