// app/grammar-correct/page.tsx
"use client"

import deleteIcon from './../../../public/delete.png'
import editIcon from './../../../public/pencil.png'
import Image from 'next/image'

import { useState } from "react";

const GrammarCorrectPage = () => {

    const [text, setText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Submit the text for grammar checking
        console.log('Text submitted for grammar check:', text);
        // You can replace the console.log with your API call or function to check grammar
    };
    return (
        <div className=" bg-white px-2 m-0  pl-3 w-[60vw] min-h-[90vh] " >

            <p className=" text-[24px] font-bold mb-10 mt-4">Hello ! Manish</p>


            <div className="border border-green-900 w-[40vw] p-5">

                <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter text to check grammar"
                        className="border border-gray-300 rounded-md p-2 w-80"
                    />
                    <button
                        type="submit"
                        className="bg-green-400 text-black font-bold text-2xl p-2 rounded-md hover:bg-green-500 transition duration-200"
                    >
                        Check Grammar
                    </button>
                </form>
            </div>
            {/* listed Ask Task  data  */}

            <div className=" mt-10 m-1 p-2 w-[40vw] ">
                <p className="mt-5 text-black mb-5" >Your History</p>
                <div>
                </div>
                {/* new */}

                <div className=" bg-gray-100 pl-8 hover:bg-green-100  m-1  justify-between flex flex-row ">
                    <div>
                        <p className=" mb-1 font-bold" > what name you is</p>
                        <p className=" mb-2 text-green-400">  what is your  name ?</p>
                    </div>

                    <div>
                        <button className=" bg-gray-100 hover:bg-green-200 p-1 m-1 rounded-md" >  <Image alt="delete" width={20} height={20} src={editIcon} /> </button>
                        <button className=" bg-gray-100 hover:bg-green-200 p-1 m-1 rounded-md" >  <Image alt="delete" width={20} height={20} src={deleteIcon} /> </button>
                    </div>
                </div>


                <div className=" bg-gray-100 pl-8 hover:bg-green-100  m-1  justify-between flex flex-row ">
                    <div>
                        <p className=" mb-1 font-bold" > what name you is</p>
                        <p className=" mb-2 text-green-400">  what is your  name ?</p>
                    </div>

                    <div>
                        <button className=" bg-gray-100 hover:bg-green-200 p-1 m-1 rounded-md" >  <Image alt="delete" width={20} height={20} src={editIcon} /> </button>
                        <button className=" bg-gray-100 hover:bg-green-200 p-1 m-1 rounded-md" >  <Image alt="delete" width={20} height={20} src={deleteIcon} /> </button>
                    </div>
                </div>

                <div className=" bg-gray-100 pl-8 hover:bg-green-100  m-1  justify-between flex flex-row ">
                    <div>
                        <p className=" mb-1 font-bold" > what name you is</p>
                        <p className=" mb-2 text-green-400">  what is your  name ?</p>
                    </div>

                    <div>
                        <button className=" bg-gray-100 hover:bg-green-800 p-1 m-1 rounded-md" >  <Image alt="delete" width={20} height={20} src={editIcon} /> </button>
                        <button className=" bg-gray-100 hover:bg-green-800 p-1 m-1 rounded-md" >  <Image alt="delete" width={20} height={20} src={deleteIcon} /> </button>
                    </div>
                </div>

                <div className=" bg-gray-100 pl-8 hover:bg-green-100  m-1  justify-between flex flex-row ">
                    <div>
                        <p className=" mb-1 font-bold" > what name you is</p>
                        <p className=" mb-2 text-green-400">  what is your  name ?</p>
                    </div>

                    <div>
                        <button className=" bg-gray-100 hover:bg-green-200 p-1 m-1 rounded-md" >  <Image alt="delete" width={20} height={20} src={editIcon} /> </button>
                        <button className=" bg-gray-100 hover:bg-green-200 p-1 m-1 rounded-md" >  <Image alt="delete" width={20} height={20} src={deleteIcon} /> </button>
                    </div>
                </div>

            </div>
        </div>

    );
};

export default GrammarCorrectPage;



