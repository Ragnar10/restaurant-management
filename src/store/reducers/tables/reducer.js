import {types} from '../../types/tables/types';

const {SET_TABLES_ACTION, SAVE_TABLE_ACTION, DELETE_TABLE_ACTION, SEARCH_TABLE_ACTION, SET_LOADING_ACTION} = types;

const initialState = {
    list: [],
    search: '',
    loading: true
};

const tablesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING_ACTION:
            return {
                ...state,
                loading: action.payload
            };
        case SET_TABLES_ACTION:
            return {
                ...state,
                list: action.payload
            };
        case SAVE_TABLE_ACTION:
            return  state.list.find(item => item.id === action.payload.id) === undefined ?
                {...state, list: [...state.list, action.payload]}
                : {...state, list: state.list.map(item => item.id === action.payload.id ? action.payload : item)};
        case DELETE_TABLE_ACTION:
            return {
                ...state,
                list: state.list.filter(item => item.id !== action.payload.id)
            };
        case SEARCH_TABLE_ACTION:
            return {
                ...state,
                search: action.payload
            };
        default:
            return state;
    }
};

export default tablesReducer;