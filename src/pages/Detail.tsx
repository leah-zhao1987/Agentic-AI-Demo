import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';

import { Card } from '../types';
import { DEFAULT_IMAGE } from '../mock/defaultData';
import Loading from '../components/Loading';
import { useFetch } from '../hooks/useFetch';

const Detail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    // const { data: allCards, loading, error } = useFetch(`/api/cards2`);
    const [card, setCard] = useState<Card | null>(null);
    const [relatedCards, setRelatedCards] = useState<Card[]>([]);
    const cacheData = localStorage.getItem('CARD_LIST');
    const allCards = JSON.parse(cacheData || '[]') || [];
    const handleRelatedClick = (relatedId: string) => {
        navigate(`/detail/${relatedId}`);
        scrollToTop();
    };
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollToTop = () => {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        scrollToTop();
    }, [id]);

    useEffect(() => {
        console.log('allCards----------', allCards);
        if (allCards && allCards.length > 0) {
            // find the card with the given id
            const currentCard = allCards.find((c: Card) => c.id?.toString() === id);
            
            if (currentCard) {
                setCard(currentCard);
                
                // find related cards, excluding the current card
                // and limiting to 3 cards
                const related = allCards
                    .filter((c: Card) => 
                        c.id?.toString() !== id && 
                        (c.majorCategory === currentCard.majorCategory)
                    )
                    .slice(0, 3);
                setRelatedCards(related);
            } else {
                // return home when card not found
                // setTimeout(() => navigate("/"), 2000);
            }
        }
    }, [id, navigate]);

    // if (loading) return <Loading />;
    // if (error) return <div className="container mx-auto p-4 text-red-500">Error fetching data: {error}</div>;
    if (!card) return <div className="container mx-auto p-4">Card not found. Redirecting to home...</div>;

    const displayImage = card.imageUrl || card.thumbnail || card.image ||
        (card.majorCategory ? DEFAULT_IMAGE[card.majorCategory as keyof typeof DEFAULT_IMAGE] : undefined);

    return (
        <div ref={containerRef} className="container mx-auto px-4 py-8 max-w-5xl h-full overflow-y-auto scrollbar-hide">
            {/* go back home */}
            <div className="mb-6">
                <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                    Back to Home
                </Link>
            </div>

            {/* main container */}
            <article className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* big image container*/}
                {displayImage && (
                    <div className="relative h-[300px] md:h-[400px] w-full">
                        <img 
                            src={displayImage} 
                            alt={card.title} 
                            className="w-full h-full object-cover"
                        />
                        {card.majorCategory && (
                            <span className="absolute top-4 left-4 px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                                {card.majorCategory}
                            </span>
                        )}
                    </div>
                )}

                {/* article body */}
                <div className="p-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{card.title}</h1>
                    
                    {/* {card.provider && (
                        <div className="flex items-center mb-6 text-gray-600">
                            {card.provider.logoUrl && (
                                <img src={card.provider.logoUrl} alt={card.provider.name} className="w-6 h-6 mr-2" />
                            )}
                            <span>{card.provider.name}</span>
                            <span className="mx-2">•</span>
                            <span>{new Date().toLocaleDateString()}</span>
                        </div>
                    )} */}

                    {card.abstract && (
                        <div className="text-lg font-medium text-gray-700 mb-6 border-l-4 border-blue-500 pl-4 italic">
                            {card.abstract}
                        </div>
                    )}

                    <div className="text-gray-700 leading-relaxed space-y-4">
                        {card.body ? (
                            <div 
                                className="article-content" 
                                dangerouslySetInnerHTML={{ __html: card.body }} 
                            />
                        ) : (
                            <>
                                <p>This article explores {card.title} in depth, providing insights and analysis on this important topic.</p>
                                <p>The content explores various aspects related to {card.majorCategory || 'this topic'}, highlighting key developments and expert opinions.</p>
                                <p>Readers will gain a comprehensive understanding of the subject matter through detailed exploration of relevant facts and context.</p>
                            </>
                        )}
                    </div>

                    {/* 标签区域 */}
                    {/* {card.tags && card.tags.length > 0 && (
                        <div className="mt-8">
                            <h3 className="text-lg font-semibold mb-2">Related Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {card.tags.map((tag, index) => (
                                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )} */}
                </div>
            </article>

            {/* related articles */}
            {relatedCards.length > 0 && (
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {relatedCards.map((relCard) => (
                            <div 
                                key={relCard.id} 
                                onClick={() => handleRelatedClick(relCard.id?.toString() || '')}
                                className="cursor-pointer group"
                            >
                                <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                                    <div className="h-40 overflow-hidden">
                                        <img 
                                            src={relCard.thumbnail || relCard.imageUrl || 
                                                (relCard.majorCategory ? DEFAULT_IMAGE[relCard.majorCategory as keyof typeof DEFAULT_IMAGE] : '')} 
                                            alt={relCard.title} 
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-semibold text-lg group-hover:text-blue-600 line-clamp-2">{relCard.title}</h3>
                                        {relCard.abstract && (
                                            <p className="text-gray-600 mt-2 text-sm line-clamp-3">{relCard.abstract}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Detail;