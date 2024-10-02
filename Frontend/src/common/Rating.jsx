import React from 'react';

const Rating = ({ rating }) => {
    // Calculate full stars and fractional part
    const fullStars = Math.floor(rating);
    const halfStarPercentage = (rating - fullStars) * 100;

    return (
        <div className="flex items-center">
            {[...Array(5)].map((_, index) => {
                const starIndex = index + 1;
                return (
                    <div key={index} className="relative">
                        {starIndex <= fullStars ? (
                            <span className="text-yellow-400 text-xl">&#9733;</span> // Full star
                        ) : starIndex === fullStars + 1 && halfStarPercentage > 0 ? (
                            <div className="relative">
                                <span className="text-yellow-400 text-xl absolute top-0 left-0 overflow-hidden" style={{ width: `${halfStarPercentage}%` }}>
                                    &#9733;
                                </span>
                                <span className="text-gray-300 text-xl">&#9733;</span>
                            </div>
                        ) : (
                            <span className="text-gray-300 text-xl">&#9733;</span> // Empty star
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default Rating;
