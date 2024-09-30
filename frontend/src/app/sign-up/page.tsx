// src/app/signup/page.tsx
"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import bgimage from "./../../../public/assets/image/bg_image.jpg";
import logo from "./../../../public/logo.png";
import { signup } from '@/services/authService';
import { useRouter } from 'next/navigation';


const Page = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
    const [signupError, setSignupError] = useState<string | null>(null); // State for signup error
    const router = useRouter();


    // Email validation regex
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
        } else if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters long');
            valid = false;
        } else {
            setPasswordError(null);
        }

        if (!confirmPassword) {
            setConfirmPasswordError('Confirm password is required');
            valid = false;
        } else if (confirmPassword !== password) {
            setConfirmPasswordError('Passwords do not match');
            valid = false;
        } else {
            setConfirmPasswordError(null);
        }

        return valid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const isValid = handleValidation();

        if (isValid) {
            try {
                await signup(email, password);
                alert('Signup successful');
                router.push('/login');

                // Handle successful signup (e.g., redirect)
            } catch (error: any) {
                setSignupError(error.response?.data?.detail || 'Signup failed. Please try again.');
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
                <h1 className="text-2xl font-bold text-center mb-4">Sign Up</h1>
                {signupError && (
                    <p className="text-red-800 text-bold text-[15px] text-center mb-4">{signupError}</p>
                )}
                <form onSubmit={handleSubmit}>
                    {/* Email Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            className={`w-full p-2 border ${emailError ? 'border-red-600' : 'border-gray-300'} rounded-md`}
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {emailError && (
                            <p className="text-red-800 text-bold text-[15px] mt-1">{emailError}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input
                            type="password"
                            className={`w-full p-2 border ${passwordError ? 'border-red-600' : 'border-gray-300'} rounded-md`}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {passwordError && (
                            <p className="text-red-800 text-bold text-[15px] mt-1">{passwordError}</p>
                        )}
                    </div>

                    {/* Confirm Password Field */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
                        <input
                            type="password"
                            className={`w-full p-2 border ${confirmPasswordError ? 'border-red-600' : 'border-gray-300'} rounded-md`}
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {confirmPasswordError && (
                            <p className="text-red-800 text-bold text-[15px] mt-1">{confirmPasswordError}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-500/90"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="text-center mt-4">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-500 hover:underline">Log In</a>
                </p>
            </div>
        </div>
    );
};

export default Page;
