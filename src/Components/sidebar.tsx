"use client";
import React from 'react';

const Sidebar = ({ isOpen, changePage, currentPage }: { isOpen: boolean; changePage: (page: string) => void; currentPage: string; }) => {
    return (
        <div className={`bg-green-300 transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-16'} h-screen`}>
            <div className={`flex flex-col ${isOpen ? 'block' : 'hidden'}`}>
                {/* Define an array of menu items for easier management */}
                {[
                    { title: 'Grammar Correct', page: 'grammar-correct' },
                    { title: 'About Us', page: 'about' },
                    { title: 'Settings', page: 'settings' },
                    { title: 'Logout', page: 'logout' },
                ].map((item) => (
                    <button
                        key={item.page}
                        onClick={() => changePage(item.page)}
                        className={`font-bold rounded p-2 m-2 transition-colors duration-300 
                            ${isOpen ? 'w-auto p-2' : 'w-auto p-2'} 
                            ${item.page === currentPage ? 'bg-white text-green-900' : 'bg-green-400 text-white'} 
                            ${item.page === currentPage ? 'hover:bg-white hover:text-green-900' : 'hover:bg-green-500'}`}
                    >
                        {item.title}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
