import {types} from '../../types/tables/types';
import api from '../../../services/api';

const {SET_TABLES_ACTION, SAVE_TABLE_ACTION, DELETE_TABLE_ACTION, SEARCH_TABLE_ACTION, SET_LOADING_ACTION} = types;

export const setLoading = (loading) => {
    return {
        type: SET_LOADING_ACTION,
        payload: loading
    };
};

export const setTables = (tables) => {
    return {
        type: SET_TABLES_ACTION,
        payload: tables
    };
};

const savedTable = (table) => {
    return {
        type: SAVE_TABLE_ACTION,
        payload: table
    };
};

const delTable = (table) => {
    return {
        type: DELETE_TABLE_ACTION,
        payload: table
    };
};

export const searchTable = (searchValue) => {
    return {
        type: SEARCH_TABLE_ACTION,
        payload: searchValue
    };
};

export const getTables = () => (dispatch) => {
    dispatch(setLoading(true));
    api.get('tables').then(resp => {
        dispatch(setTables(resp.data));
        dispatch(setLoading(false));
    });
};

export const saveTable = (table) => (dispatch) => {
    dispatch(setLoading(true));
    !table.id ?
    api.post('tables', table)
        .then(resp => {
            dispatch(savedTable(resp.data));
            dispatch(setLoading(false));
        })
    : api.put(`tables/${table.id}`, table)
            .then(resp => {
                dispatch(savedTable(resp.data));
                dispatch(setLoading(false));
            })
};

export const deleteTable = (tableId) => (dispatch) => {
    dispatch(setLoading(true));
    api.delete(`tables/${tableId}`)
        .then(resp => {
            dispatch(delTable(resp.data));
            dispatch(setLoading(false));
        });
};