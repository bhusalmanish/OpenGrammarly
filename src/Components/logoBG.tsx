import React from 'react';

type LogoBGProps = {
    imageUrl: string;
    bgSize: string;
    opacity: number;
    children: React.ReactNode;
};

export default function LogoBG({ imageUrl, bgSize, opacity, children }: LogoBGProps) {
    return (
        <div>


            <div className=" min-h-screen">
                {/* <div
                    className=" absolute z-0 inset-0 bg-repeat bg-center"
                    style={{
                        backgroundImage: `url(${imageUrl})`,
                        backgroundSize: bgSize,
                        opacity: opacity,
                    }}
                > */}

                <div
                    className="absolute inset-0 bg-articon bg-repeat bg-cover bg-center -z-10"
                    style={{
                        backgroundImage: `url(${imageUrl})`,
                        backgroundSize: bgSize,
                        opacity: opacity,
                    }}
                ></div>


            </div>
            <div className="  bg-green-400 bg-opacity-70 text-black p-8"> {/* Add bg-opacity for better contrast */}
                {children}
            </div>
        </div >

    );
}
