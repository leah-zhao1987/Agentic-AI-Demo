import React, { useState } from 'react';

import { Card as CardType } from '../types';
import { useNavigate } from 'react-router-dom';

interface CardProps {
  card: CardType;
  onReject?: (id: number) => void;
  onApprove?: (id: number) => void;
}


const Card: React.FC<CardProps> = ({ card, onReject, onApprove }) => {
  const [imageError, setImageError] = useState(false);
  
  // 处理图片加载错误
  const handleImageError = () => {
    setImageError(true);
  };
  
  // 获取要显示的图片URL
  const getImageUrl = () => {
    // 如果图片加载失败或没有图片URL，使用默认图片
    if (imageError || !card.thumbnail) {
      return card.defaultImag;
    }
    return card.thumbnail;
  };

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
      if (window.confirm('Are you sure you want to approve this card?')) {
        onApprove(card.id);
      }
    }
  }

  const navigate = useNavigate();
  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName === 'BUTTON' || 
        (e.target as HTMLElement).closest('button')) {
      return;
    }
    console.log('Card clicked:', card.id);
    if (card.id && !card.isPlaceholder) {
      navigate(`/detail/${card.id}`);
    }
  };

  const displayCard = (
    <div className="card h-[380px] w-[270px] shadow-md rounded-lg overflow-hidden flex flex-col transition-transform duration-300 hover:translate-y-[-2px]">
      <div className="bg-white h-full w-full flex justify-between flex-col">
        <div className='body' onClick={handleCardClick}>
          <div className='w-[240px] h-[180px]'>
            <img
              src={getImageUrl()}
              alt={card.title || 'Card image'}
              onError={handleImageError}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="flex items-center justify-start text-gray-500 text-sm mt-2">
            {/* <img src={card.provider?.logoUrl} className="w-[16px] object-cover" /> */}
            <span>{card.provider}</span>
            {/* <span className='mr-1 ml-1'>·</span> */}
            {/* <span>2h</span> */}
          </div>
          <h5 className="text-l font-bold line-clamp-3 mt-2 hover:text-blue-600" title={card.title}>{card.title}</h5>
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
      <div className="card h-[380px] w-[270px]"></div>
  );
  return card.isPlaceholder ? hideCard : displayCard;
};

export default Card;