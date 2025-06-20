import React, { useEffect, useState } from 'react';

import { Card as CardType } from '../types';

interface CardProps {
  card: CardType;
}

const LazyCard: React.FC<CardProps> = ({ card }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <div className="card h-[400px] w-[300px] p-20 shadow-md rounded-lg flex items-center justify-center">
      <div className="bg-white h-full w-[260px] flex justify-between flex-col">
        <div className='body'>
          <div className='w-[260px] h-[180px]'>
            {/* <img src={card?.images[0]?.url} className="w-full h-full rounded-t-lg" /> */}
            <div className="relative h-[180px] bg-gray-200">
              {card.images && (
                <>
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                  <img
                    src={card?.images[0]?.url}
                    alt={card.title}
                    className={`w-full h-full object-cover rounded-t-lg transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    loading="lazy"
                    onLoad={() => setImageLoaded(true)}
                  />
                </>
              )}
            </div>
          </div>
          <div className="flex items-center justify-start text-gray-500 text-sm mt-2">
            <img src={card.provider.logoUrl} className="w-[16px] object-cover" />
            <span className='pl-2'>{card.provider.name}</span>
            <span className='mr-1 ml-1'>·</span>
            <span>2h</span>
          </div>
          <h5 className="text-xl font-bold line-clamp-3 mt-2 hover:text-blue-600" title={card.title}>{card.title}</h5>
        </div>
        <div className="flex justify-end">
          <button className="w-[80px] py-2 mr-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            approve
          </button>
          <button className="w-[80px] py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            reject
          </button>
        </div>
      </div>
    </div>


    // <div className="bg-white rounded-lg shadow-lg overflow-hidden w-[280px]">
    //   <div className="relative h-[180px] bg-gray-200">
    //     {card.images && (
    //       <>
    //         {!imageLoaded && (
    //           <div className="absolute inset-0 flex items-center justify-center">
    //             <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    //           </div>
    //         )}
    //         <img
    //           src={card?.images[0]?.url}
    //           alt={card.title}
    //           className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
    //           loading="lazy"
    //           onLoad={() => setImageLoaded(true)}
    //         />
    //       </>
    //     )}
    //   </div>
    //   <div className="p-4">
    //     <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
    //     <p className="text-gray-600">{card.description}</p>
    //   </div>
    // </div>
  );
};

export default LazyCard;