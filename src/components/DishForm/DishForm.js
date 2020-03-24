import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Redirect, Route} from "react-router-dom";
import {saveDish} from '../../store/actions/dishes/actions';
import {ingredientsData} from "../../services/ingredientsApi";

import './DishForm.css';

const DishForm = ({dish, dishes, history, match, saveDish}) => {
    const [newDish, setNewDish] = useState(dish);
    const [error, setError] = useState(false);

    const onChangeInput = (e) => {
        setNewDish({
            ...newDish,
            [e.target.name]: e.target.value
        });
    };

    const onAddIngredient = (ingredient) => {
        setNewDish({
            ...newDish,
            ingredients: newDish.ingredients ? [...newDish.ingredients.split(','), ingredient].join(',') : ingredient
        });
    };

    const onDeleteIngredient = (idx) => {
        setNewDish({
            ...newDish,
            ingredients: newDish.ingredients.split(',').filter((item, i) => i !== idx).join(',')
        });
    };

    const onSaveDish = () => {
        if (!newDish.name || !newDish.description || !newDish.kcal || !newDish.price || !newDish.ingredients) {
            setError(true);
            return;
        }
        setError(false);
        saveDish(newDish);
        history.goBack();
    };

    const id = dishes.findIndex(item => item.id === match.params.id);
    if (id === -1 && match.params.id !== 'new') {
        return (
            <Route>
                <Redirect to='/tables'/>
            </Route>
        );
    }

    return (
        <div className='dish_form'>
            <label htmlFor='name' className='dish_label'>Dish:</label>
            <input type='text'
                   name='name'
                   className='dish_input'
                   maxLength='50'
                   value={newDish.name}
                   onChange={onChangeInput}
            />
            <label htmlFor='description' className='dish_label'>Description:</label>
            <input type='text'
                   name='description'
                   className='dish_input'
                   value={newDish.description}
                   onChange={onChangeInput}
            />
            <label htmlFor='kcal' className='dish_label'>Kcal:</label>
            <input type='text'
                   name='kcal'
                   className='dish_input'
                   value={newDish.kcal}
                   onChange={onChangeInput}
            />
            <div className='dish_label'>Ingredients:</div>
            <div className='dish_select_wrapper'>
                <div className='dish_select'>
                    {
                        newDish.ingredients ? newDish.ingredients.split(',').map((item, idx) => {
                           return (
                               <div style={{display: 'flex'}}>
                                   <div key={item}
                                        className='dish_ingredient'
                                   >
                                       {item}
                                   </div>
                                   <div className='del_ingredient' onClick={() => onDeleteIngredient(idx)}>x</div>
                               </div>
                           );
                        }) : null
                    }
                </div>
                <div className='dish_select'>
                    {
                        ingredientsData.map((item) => {
                            return (
                                <div style={{display: 'flex'}}>
                                    <div key={item}
                                         className='dish_ingredient_select'
                                         onClick={() => onAddIngredient(item)}
                                    >
                                        {item}
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            <label htmlFor='price' className='dish_label'>Price:</label>
            <input type='text'
                   name='price'
                   className='dish_input'
                   value={newDish.price}
                   onChange={onChangeInput}
            />
            <div className='dish_error'>{error ? 'Не все поля заполенны': null}</div>
            <div className='save_btn' onClick={onSaveDish}>Save</div>
        </div>
    );
};

const mapStateToProps = (state, props) => {
    return {
        dish: props.id !== 'new' ? props.dishes.find(item => item.id === props.id) : {name: '', description: '', price: '', multiplier: '1', kcal: '', ingredients: ''},
        dishes: props.dishes
    }
};
const mapDispatchToProps = {
    saveDish: saveDish
};

export default connect(mapStateToProps, mapDispatchToProps)(DishForm);