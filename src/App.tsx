import { DEFAULT_CATEGORIES } from './mock/defaultData';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes';

const App: React.FC = () => {
  return (
    <div className="h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-10 bg-gray-700 text-white p-4 shadow-md w-full">
        <div className="mx-auto flex justify-between items-center w-full">
          <h1 className="text-xl md:text-2xl font-bold w-full">Top 20 News</h1>
          {/* <nav className="hidden md:block">
            <ul className="flex space-x-4">
              <li key='home'>
                <a href='/' className="hover:text-gray-400 text-white">
                  home
                </a>
              </li>
              {DEFAULT_CATEGORIES.map((category) => (
                <li key={category}>
                  <a href={`/category/${category.toLowerCase()}`} className="hover:text-gray-400 text-white">
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </nav> */}
          {/* <button className="md:hidden" onClick={() => alert('Menu clicked!')}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button> */}
        </div>
      </header>
      
      <main className="flex-grow pt-20 h-full overflow-y-auto scrollbar-hide w-full">
        <RouterProvider router={router} />
      </main>
      
      {/* <footer className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-6 min-w-[360px]">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>&copy; {new Date().getFullYear()} Demo App. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <span>Terms</span>
            <span>Privacy</span>
            <span>Contact</span>
          </div>
        </div>
      </footer> */}
    </div>
  );
};

export default App;