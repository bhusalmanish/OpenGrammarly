"use client";
import React from 'react';
import { useRouter } from 'next/navigation';


const Sidebar = ({ isOpen, changePage, currentPage }: { isOpen: boolean; changePage: (page: string) => void; currentPage: string; }) => {

    const router = useRouter();

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

                <div> <button className=' bg-red-500' onClick={() => {
                    alert("Are you sure want to logout?"), localStorage.removeItem('token');
                    router.push('/login');
                }}> Logout</button> </div>
            </div>
        </div >
    );
};

export default Sidebar;




// logout MOdel

// src/components/ConfirmationModal.tsx

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null; // Don't render anything if not open

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-lg">
                <h2 className="text-lg font-bold mb-4">Confirmation</h2>
                <p>Are you sure you want to log out?</p>
                <div className="flex justify-end mt-4">
                    <button className="bg-gray-300 text-black px-4 py-2 rounded-md mr-2" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={onConfirm}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

