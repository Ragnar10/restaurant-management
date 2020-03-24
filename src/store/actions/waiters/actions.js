import {types} from '../../types/waiters/types';
import api from '../../../services/api';

const {SET_WAITERS_ACTION, SAVE_WAITER_ACTION, DELETE_WAITER_ACTION, SEARCH_WAITER_ACTION, SET_LOADING_ACTION} = types;

export const setLoading = (loading) => {
    return {
        type: SET_LOADING_ACTION,
        payload: loading
    };
};

export const setWaiters = (waiters) => {
    return {
        type: SET_WAITERS_ACTION,
        payload: waiters
    };
};

const savedWaiter = (waiter) => {
    return {
        type: SAVE_WAITER_ACTION,
        payload: waiter
    };
};

const delWaiter = (waiter) => {
    return {
        type: DELETE_WAITER_ACTION,
        payload: waiter
    };
};

export const searchWaiter = (searchValue) => {
    return {
        type: SEARCH_WAITER_ACTION,
        payload: searchValue
    };
};

export const getWaiters = () => (dispatch) => {
    dispatch(setLoading(true));
    api.get('waiters').then(resp => {
        dispatch(setWaiters(resp.data));
        dispatch(setLoading(false));
    });
};

export const saveWaiter = (waiter) => (dispatch) => {
    dispatch(setLoading(true));
    !waiter.id ?
    api.post('waiters', waiter)
        .then(resp => {
            dispatch(savedWaiter(resp.data));
            dispatch(setLoading(false));
        })
    : api.put(`waiters/${waiter.id}`, waiter)
            .then(resp => {
                dispatch(savedWaiter(resp.data));
                dispatch(setLoading(false));
            })
};

export const deleteWaiter = (waiterId) => (dispatch) => {
    dispatch(setLoading(true));
    api.delete(`waiters/${waiterId}`)
        .then(resp => {
            dispatch(delWaiter(resp.data));
            dispatch(setLoading(false));
        });
};