import {types} from '../../types/dishes/types';
import api from '../../../services/api';

const {SET_DISHES_ACTION, SAVE_DISH_ACTION, DELETE_DISH_ACTION, SEARCH_DISH_ACTION, SET_LOADING_ACTION} = types;

export const setLoading = (loading) => {
    return {
        type: SET_LOADING_ACTION,
        payload: loading
    };
};

export const setDishes = (dishes) => {
    return {
        type: SET_DISHES_ACTION,
        payload: dishes
    };
};

const savedDish = (dish) => {
    return {
        type: SAVE_DISH_ACTION,
        payload: dish
    };
};

const delDish = (dish) => {
    return {
        type: DELETE_DISH_ACTION,
        payload: dish
    };
};

export const searchDish = (searchValue) => {
    return {
        type: SEARCH_DISH_ACTION,
        payload: searchValue
    };
};

export const getDishes = () => (dispatch) => {
    dispatch(setLoading(true));
    api.get('dishes').then(resp => {
        dispatch(setDishes(resp.data));
        dispatch(setLoading(false));
    });
};

export const saveDish = (dish) => (dispatch) => {
    dispatch(setLoading(true));
    !dish.id ?
    api.post('dishes', dish)
        .then(resp => {
            dispatch(savedDish(resp.data));
            dispatch(setLoading(false));
        })
    : api.put(`dishes/${dish.id}`, dish)
            .then(resp => {
                dispatch(savedDish(resp.data));
                dispatch(setLoading(false));
            })
};

export const deleteDish = (dishId) => (dispatch) => {
    dispatch(setLoading(true));
    api.delete(`dishes/${dishId}`)
        .then(resp => {
            dispatch(delDish(resp.data));
            dispatch(setLoading(false));
        });
};