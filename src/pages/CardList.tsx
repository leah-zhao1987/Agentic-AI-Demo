import Card from '../components/Card';
import { Card as CardType } from '../types';
import React from 'react';

interface CardListProps {
    cards: CardType[];
    topic?: string;
    onHandleData: (id: any, status: number) => void;
}

const CardList: React.FC<CardListProps> = ({ cards, topic, onHandleData }) => {
    const handleDeleteCard = (id: number) => {
        onHandleData(id,0);
    };
    const handleApproveCard = (id: number) => {
        onHandleData(id,1);
    };
    const showTitle = (category: string) => (
        <div className="flex justify-between items-center pr-6 pb-6">
            <h2 className="py-4 px-6 text-2xl font-bold capitalize text-left border-l-4 border-blue-500 ml-4 flex items-center bg-white bg-opacity-50 shadow-sm w-fit">
            <span className="text-black-700">{category.replace('&', ' & ')}</span>
            <span className="ml-2 text-sm text-blue-500 font-normal">({cards.length})</span>
            </h2>
        </div>
    );

    return (
        <div className="container mx-auto px-4 pb-6 w-full">
            {/* {topic ? (<h1 className="text-3xl font-bold mb-6">{topic}</h1>): null} */}
            {topic && showTitle(topic)}
            <div className="flex flex-wrap justify-center gap-6">
                {cards.map((card) => (
                    <div key={card.id || `card-${Math.random()}`} className="card-container h-full">
                        <Card 
                            card={card} 
                            onApprove={handleDeleteCard} 
                            onReject={handleDeleteCard}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardList;