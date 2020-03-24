import React from 'react';

import './DishesItem.css';

const DishesItem = ({dish, deleteDish, editDish}) => {

    const onDeleteDish = (dishId) => {
        deleteDish(dishId);
    };

    const onEditDish = (dishId) => {
        editDish(dishId);
    };

    return (
        <>
            <tr>
                <td>
                    <span className='dish_name'>{dish.name}</span>
                    { dish.name !== 'Пиво' ? <span className='dish_ingredients'>{`(${dish.ingredients})`}</span> : null }
                </td>
                <td>{`"${dish.description}"`}</td>
                <td>{dish.kcal}</td>
                <td className='dish_price'>{`${dish.price} грн`}</td>
                <td className='dish_edit' onClick={() => onEditDish(dish.id)}>Редактировать</td>
                <td className='dish_del' onClick={() => onDeleteDish(dish.id)}>Удалить</td>
            </tr>
        </>
    );
};

export default DishesItem;