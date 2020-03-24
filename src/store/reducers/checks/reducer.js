import {types} from '../../types/checks/types';

const {SET_CHECKS_ACTION, SAVE_CHECK_ACTION, SEARCH_CHECK_ACTION, SET_LOADING_ACTION, CLOSE_CHECK_ACTION} = types;

const initialState = {
    list: [],
    search: '',
    loading: true
};

const checksReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING_ACTION:
            return {
                ...state,
                loading: action.payload
            };
        case SET_CHECKS_ACTION:
            return {
                ...state,
                list: action.payload
            };
        case SAVE_CHECK_ACTION:
            return  state.list.find(item => item.id === action.payload.id) === undefined ?
                {...state, list: [...state.list, action.payload]}
                : {...state, list: state.list.map(item => item.id === action.payload.id ? action.payload : item)};
        case SEARCH_CHECK_ACTION:
            return {
                ...state,
                search: action.payload
            };
        case CLOSE_CHECK_ACTION:
            return {
                ...state,
                list: state.list.map(item => item.id === action.payload.id ? action.payload : item)
            };
        default:
            return state;
    }
};

export default checksReducer;