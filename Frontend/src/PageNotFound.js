import React from 'react';

function PageNotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <svg
                className="emoji-404"
                enableBackground="new 0 0 226 249.135"
                height="249.135"
                id="Layer_1"
                overflow="visible"
                version="1.1"
                viewBox="0 0 226 249.135"
                width="226"
                xmlSpace="preserve"
            >
                <circle cx="113" cy="113" fill="#FFE585" r="109" />
                <line
                    enableBackground="new"
                    fill="none"
                    opacity="0.29"
                    stroke="#6E6E96"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="8"
                    x1="88.866"
                    x2="136.866"
                    y1="245.135"
                    y2="245.135"
                />
                {/* Add more SVG elements here */}
            </svg>
            <div className="text-center mt-4">
                <span className="text-gray-500 text-6xl block">404</span>
                <span className="text-gray-500 text-xl">Sorry, We couldn't find what you are looking for!</span>
            </div>
            <div className="mt-6">
                <a href="#" className="text-gray-500 font-mono text-xl bg-gray-200 p-3 rounded-md hover:shadow-md">
                    Go back
                </a>
            </div>
        </div>
    );
}

export default PageNotFound;
