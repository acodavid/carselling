import React from 'react';
import Car from '../cars/Car';

const Posts = ({ cars }) => {

    return (
        <div>
            {cars.map(car => (
                <Car key={car._id} cars={car} />
            ))}
        </div>


    );
};

export default Posts;