import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-gray-800 text-white p-4">
                <h1 className="text-xl">My Application</h1>
            </header>
            <main className="flex-grow p-4">
                {children}
            </main>
            <footer className="bg-gray-800 text-white p-4 text-center">
                <p>&copy; 2023 My Application</p>
            </footer>
        </div>
    );
};

export default Layout;