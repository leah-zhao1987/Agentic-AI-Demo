import { Card as CardType } from '../types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface CardProps {
  card: CardType;
  onReject?: (id: number) => void;
  onApprove?: (id: number) => void;
}


const Card: React.FC<CardProps> = ({ card, onReject, onApprove }) => {
  const handleReject = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onReject && card.id) {
      if (window.confirm('Are you sure you want to reject this card?')) {
        onReject(card.id);
      }
    }
  }

  const handleApprove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onApprove && card.id) {
      onApprove(card.id);
    }
  }
  // console.log('card', card);

  const navigate = useNavigate();
  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName === 'BUTTON' || 
        (e.target as HTMLElement).closest('button')) {
      return;
    }
    
    if (card.id && !card.isPlaceholder) {
      navigate(`/detail/${card.id}`);
    }
  };

  const displayCard = (
    <div className="card h-[400px] w-[300px] p-20 shadow-md rounded-lg overflow-hidden flex flex-col transition-transform duration-300 hover:translate-y-[-2px]">
      <div className="bg-white h-full w-[260px] flex justify-between flex-col">
        <div className='body' onClick={handleCardClick}>
          <div className='w-[260px] h-[180px]'>
            {/* <img src={card?.images[0]?.url} className="w-full h-full rounded-t-lg" /> */}
            <img src={card?.thumbnail || card?.image || card.defaultImag} className="w-full h-full rounded-t-lg" />
          </div>
          <div className="flex items-center justify-start text-gray-500 text-sm mt-2">
            <img src={card.provider?.logoUrl} className="w-[16px] object-cover" />
            <span className='pl-2'>{card.provider}</span>
            <span className='mr-1 ml-1'>·</span>
            <span>2h</span>
          </div>
          <h5 className="text-xl font-bold line-clamp-3 mt-2 hover:text-blue-600" title={card.title}>{card.title}</h5>
        </div>
        <div className="flex justify-end">
          <button className="w-[80px] py-2 mr-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleApprove}>
            approve
          </button>
          <button className="w-[80px] py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleReject}>
            reject
          </button>
        </div>
      </div>
    </div>
  );

  const hideCard = (
      <div className="h-[400px] w-[300px] p-20"></div>
  );
  return card.isPlaceholder ? hideCard : displayCard;
};

export default Card;