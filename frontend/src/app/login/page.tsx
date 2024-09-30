"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import bgimage from "./../../../public/assets/image/bg_image.jpg";
import logo from "./../../../public/logo.png";

const Page = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleValidation = (): boolean => {
        let valid = true;

        if (!email) {
            setEmailError('Email is required');
            valid = false;
        } else if (!validateEmail(email)) {
            setEmailError('Invalid email format');
            valid = false;
        } else {
            setEmailError(null);
        }

        if (!password) {
            setPasswordError('Password is required');
            valid = false;
        } else {
            setPasswordError(null);
        }

        return valid;
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const isValid = handleValidation();

        if (isValid) {
            try {
                const response = await fetch('http://127.0.0.1:8000/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        'username': email,
                        'password': password,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Login failed. Please check your credentials and try again.');
                }

                const data = await response.json();
                console.log('Login successful:', data);
                setSuccessMessage('Login successful');
                setErrorMessage(null);

                // Store token and redirect the user after successful login
                localStorage.setItem('token', data.access_token);
                window.location.href = '/Home'; // Redirect to the dashboard or another protected page

            } catch (error) {
                console.error('Error during login:', error);
                setErrorMessage('Login failed. Please try again.');
                setSuccessMessage(null);
            }
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
            style={{ backgroundImage: "url('/assets/image/bg_image.jpg')" }}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-300 opacity-50"></div>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md z-10">
                <div className='flex flex-row justify-center px-5 mb-11 gap-1'>
                    <Image alt="logo" width={40} height={40} src={logo} />
                    <p className='text-green-600 font-bold text-[24px] font-mono'>OpenGrammarly</p>
                </div>
                <h1 className="text-2xl font-bold text-center mb-4">Log In</h1>
                <form onSubmit={handleLogin}>
                    {/* Email Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            className={`w-full p-2 border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {emailError && (
                            <p className="text-red-800 text-bold text-[15px] text-xs mt-1">{emailError}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input
                            type="password"
                            className={`w-full p-2 border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {passwordError && (
                            <p className="text-red-800 text-bold text-[15px] text-xs mt-1">{passwordError}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
                    >
                        Log In
                    </button>
                </form>

                {successMessage && <p className="text-green-600 text-center mt-4">{successMessage}</p>} {/* Display success message */}
                {errorMessage && <p className="text-red-800 text-center mt-4">{errorMessage}</p>} {/* Display error message */}
                <p className="text-center mt-4">
                    Don’t have an account?{' '}
                    <a href="/sign-up" className="text-blue-500 hover:underline">
                        Sign Up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Page;
