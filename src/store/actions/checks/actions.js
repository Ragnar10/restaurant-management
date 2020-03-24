import {types} from '../../types/checks/types';
import api from '../../../services/api';

const {SET_CHECKS_ACTION, SAVE_CHECK_ACTION, SEARCH_CHECK_ACTION, SET_LOADING_ACTION, CLOSE_CHECK_ACTION} = types;

export const setLoading = (loading) => {
    return {
        type: SET_LOADING_ACTION,
        payload: loading
    };
};

export const setChecks = (checks) => {
    return {
        type: SET_CHECKS_ACTION,
        payload: checks
    };
};

const savedCheck = (check) => {
    return {
        type: SAVE_CHECK_ACTION,
        payload: check
    };
};

const closedCheck = (check) => {
    return {
        type: CLOSE_CHECK_ACTION,
        payload: check
    };
};



export const searchCheck = (searchValue) => {
    return {
        type: SEARCH_CHECK_ACTION,
        payload: searchValue
    };
};

export const getChecks = () => (dispatch) => {
    dispatch(setLoading(true));
    api.get('checks').then(resp => {
        dispatch(setChecks(resp.data));
        dispatch(setLoading(false));
    });
};

export const saveCheck = (check) => (dispatch) => {
    dispatch(setLoading(true));
    !check.id ?
    api.post('checks', check)
        .then(resp => {
            dispatch(savedCheck(resp.data));
            dispatch(setLoading(false));
        })
    : api.put(`checks/${check.id}`, check)
            .then(resp => {
                dispatch(savedCheck(resp.data));
                dispatch(setLoading(false));
            })
};

export const closeCheck = (check) => (dispatch) => {
    dispatch(setLoading(true));
    api.put(`checks/${check.id}`, check)
        .then(resp => {
            dispatch(closedCheck(resp.data));
            dispatch(setLoading(false));
        })
};
