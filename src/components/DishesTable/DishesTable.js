import React from 'react';
import DishesItem from "../DishesItem/DishesItem";

import './DishesTable.css';

const DishesTable = ({dishes, deleteDish, editDish}) => {
    return (
        <table className='dish'>
            <thead>
                <tr>
                    <th>Название</th>
                    <th>Описание</th>
                    <th>Каллорийность</th>
                    <th>Цена</th>
                    <th colSpan={2}/>
                </tr>
            </thead>
            <tbody>
                {dishes.map(item => {
                    return <DishesItem
                        dish={item}
                        key={item.id}
                        deleteDish={deleteDish}
                        editDish={editDish}
                    />
                })}
            </tbody>
        </table>
    );
};

export default DishesTable;