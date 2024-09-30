"use client";

import React, { useEffect, useState } from 'react';


// Import the content components
// Adjust the path as needed

import Navbar from '@/Components/navbar';
import Sidebar from '@/Components/sidebar';
import GrammarCorrectPage from '../grammar-check/page';
import AboutPage from '../about/page';
import SettingsPage from '../setting/page';
import { isAuthenticated, isTokenExpired } from '@/services/authService';
import { useRouter } from 'next/navigation';
// import router, { useRouter } from 'next/router';

export default function Page() {
    const [isOpen, setIsOpen] = useState(true);
    const [currentPage, setCurrentPage] = useState('grammar-correct');


    const router = useRouter();

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if (isTokenExpired(token)) {
    //         setErrorMessage('Session expired. Please log in again.');
    //         { !errorMessage ?? alert(errorMessage) }
    //         setTimeout(() => {
    //             router.push('/login');
    //         }, 2000);
    //     }
    // }, [router]);




    useEffect(() => {
        if (!isAuthenticated()) {
            router.push('/login');
        }
    }, [router]);




    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const changePage = (page: string) => {
        setCurrentPage(page);
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'grammar-correct':
                return <GrammarCorrectPage />;
            case 'about':
                return <AboutPage />;
            case 'settings':
                return <SettingsPage />;
            default:
                return <GrammarCorrectPage />;
        }
    };

    return (
        <div>
            <Navbar toggleSidebar={toggleSidebar} />
            <div className="flex">
                <Sidebar isOpen={isOpen} changePage={changePage} currentPage={currentPage} />
                {/* Main Content */}
                <div className="flex-1 p-4">
                    {renderPage()}
                </div>
            </div>
        </div>

    );
}
