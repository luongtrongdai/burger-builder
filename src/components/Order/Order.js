import React from 'react';

import classes from './Order.css';

const order = (props) => {
    const ingredients = [];
    for (let name in props.ingredients) {
        ingredients.push({
            name: name,
            amount: props.ingredients[name]
        });
    }

    const ingredientOutput = ingredients.map(ig => {
        return (ig.amount > 0) ?
        <span key={ig.name}
                    style={{ textTransform: 'capitalize'
                            , display: 'inline-block'
                            , margin: '0 8px'
                            , border: '1px solid #ccc'
                            , padding: '2px' }}>{ig.name} ({ig.amount})</span>
        : null;
    });

    return (
        <div className={ classes.Order }>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
};

export default order;