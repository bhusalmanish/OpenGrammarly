"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import editIcon from "./../../../public/pencil.png";
import deleteIcon from "./../../../public/delete.png";

const Page = () => {
    const [text, setText] = useState('');
    const [InputText, setInputText] = useState('');
    // const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [correctionData, setCorrectionData] = useState<{ corrected_text: string, correction_id: number, corrected_check: number, original_check: number } | null>(null);


    function handelEmptyCorrectionData() {
        setCorrectionData(null)
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setInputText(text);



        console.log('Text submitted for grammar check:', text);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                'http://localhost:8000/correct-grammar/',
                { text },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            setCorrectionData(response.data);
            setText('');

        } catch (error) {
            console.error('Error correcting grammar:', error);


            // Check if the error is a 401 Unauthorized
            // if (axios.isAxiosError(error) && error.response?.status === 401) {
            //     setErrorMessage('Session expired. Please log in again.');
            //     setTimeout(() => {
            //         router.push('/login'); // Redirect to the login page after 2 seconds
            //     }, 2000);
            // }

        }
    };


    return (
        <div className="bg-white px-2 m-0 pl-3 w-[60vw] min-h-[90vh]">
            <p className="text-[24px] font-bold mb-10 mt-4">Hello, Manish!</p>
            {/* {errorMessage && (
                <div className="bg-red-200 text-red-700 p-2 rounded-md mb-4">
                    {errorMessage} */}
            {/* </div> */}
            {/* )
} */}


            <div className="border border-green-900 w-[40vw] p-5">
                <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4 mb-10 ">
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter text to check grammar"
                        className="border border-gray-300 rounded-md p-2 w-80"
                    />
                    <button
                        type="submit"
                        // disabled={!text}

                        className={`text-black font-bold text-2xl p-2 rounded-md transition duration-200 ${!text ? 'bg-green-200 opacity-50 cursor-not-allowed ' : 'bg-green-400  hover:bg-green-500 hover:text-white'}`}
                    >
                        Check Grammar
                    </button>
                </form>

                {/* output data */}
                <div>

                    {correctionData && (

                        <div className="mt-5 p-5 border border-gray-300 rounded-md">

                            <div className="flex justify-end">
                                <button className=" p-1 text-red-400 hover:text-red-600 hover:-rotate-180" onClick={() => { handelEmptyCorrectionData() }} > x</button>
                            </div>
                            <h3 className="text-lg font-bold">Correction Result</h3>
                            <p><strong>Input Text:</strong> {InputText}</p>
                            <p><strong>Input Text Grammer :</strong> {correctionData.original_check}</p>
                            <p><strong>OutPut Text Grammar  :</strong> {Number(correctionData.corrected_check)}</p>
                            <p><strong>Corrected Text:</strong> {correctionData.corrected_text.toString()}</p>
                            {/* <p><strong>Correction ID:</strong> {correctionData.correction_id}</p> */}
                        </div>
                    )}
                </div>
            </div>

            {/* history data  */}

            <CorrectionHistory />
        </div >
    );
};

export default Page;

function GetHistoryText() {
    return (
        <div>
            <p>History Data</p>
            <div className="mt-10 m-1 p-2 w-[40vw]">
                <p className="mt-5 text-black mb-5">Your History</p>
                <div>
                    <div key={1} className="bg-gray-100 pl-8 hover:bg-green-100 m-1 justify-between flex flex-row">
                        <div>
                            <p className="mb-1 font-bold">{"What time is it?"}</p>
                            <p className="mb-2 text-green-400">{"Corrected text appears here"}</p>
                        </div>
                        <div>
                            <button className="bg-gray-100 hover:bg-green-200 p-1 m-1 rounded-md">
                                <Image alt="edit" width={20} height={20} src={editIcon} />
                            </button>
                            <button className="bg-gray-100 hover:bg-green-200 p-1 m-1 rounded-md">
                                <Image alt="delete" width={20} height={20} src={deleteIcon} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



interface Correction {
    id: number;
    original_text: string;
    corrected_text: string;
    original_check: string;
    corrected_check: string;
}

// Define the props for the component
// interface CorrectionHistoryProps {
//     token: string;
// }

const CorrectionHistory: React.FC = () => {
    const [corrections, setCorrections] = useState<Correction[]>([]);
    const [error, setError] = useState<string>('');
    const token = localStorage.getItem('token');
    useEffect(() => {
        const fetchCorrections = async () => {
            try {
                const response = await axios.get<Correction[]>('http://localhost:8000/corrections/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCorrections(response.data);
            } catch (err) {
                console.error('Error fetching corrections', err);
                setError('Failed to fetch correction history');
            }
        };

        fetchCorrections();
    }, [token]);

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h2>Correction History</h2>
            {corrections.length === 0 ? (
                <p>No correction history found.</p>
            ) : (
                <ul>
                    {corrections.map((correction) => (
                        <li key={correction.id}>
                            <p><strong>Original Text:</strong> {correction.original_text}</p>
                            <p><strong>Corrected Text:</strong> {correction.corrected_text}</p>
                            <p><strong>Original Check:</strong> {correction.original_check}</p>
                            <p><strong>Corrected Check:</strong> {correction.corrected_check}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

