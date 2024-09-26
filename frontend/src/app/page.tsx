// "use client";
// import React, { useState } from 'react';

// // Import the content components
// import AboutPage from './about/page'; // Adjust the path as needed
// import Navbar from '@/Components/navbar';
// import Sidebar from '@/Components/sidebar';
// import GrammarCorrectPage from './grammar-check/page';
// import SettingsPage from './setting/page';

// export default function Page() {
//     const [isOpen, setIsOpen] = useState(false); // Sidebar open state
//     const [currentPage, setCurrentPage] = useState('grammar-correct'); // Default page

//     // Function to toggle the sidebar
//     const toggleSidebar = () => {
//         setIsOpen(!isOpen); // Toggle sidebar state
//     };

//     // Function to change the current page
//     const changePage = (page: string) => {
//         setCurrentPage(page); // Update the current page
//     };

//     // Function to render the correct page based on currentPage state
//     const renderPage = () => {
//         switch (currentPage) {
//             case 'grammar-correct':
//                 return <GrammarCorrectPage />;
//             case 'about':
//                 return <AboutPage />;
//             case 'settings':
//                 return <SettingsPage />;
//             default:
//                 return <GrammarCorrectPage />;
//         }
//     };

//     return (
//         <div>
//             <Navbar toggleSidebar={toggleSidebar} />
//             <div className="flex">
//                 <Sidebar isOpen={isOpen} changePage={changePage} currentPage={currentPage} />
//                 {/* Main Content */}
//                 <div className="flex-1 p-4">
//                     {renderPage()}
//                 </div>
//             </div>
//             <div
//                 className="absolute inset-0 bg-articon bg-repeat bg-cover bg-center -z-10"
//                 style={{
//                     backgroundImage: `url(/logo.png)`,
//                     backgroundSize: 20,
//                     opacity: 0.1,
//                 }}
//             />
//         </div>
//     );
// }

import React from 'react'
import Login from './login/page'

export default function page() {
    return (
        <div>
            <Login />
        </div>
    )
}
