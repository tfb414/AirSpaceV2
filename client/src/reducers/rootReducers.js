import * as actions from '../actions';
import {combineReducers} from 'redux';

const user = (state={}, action) => {
    switch(action.type) {
        case actions.SETGUESTID:
            let newState = {...state};
            newState["guest_id"] = action.guest_id;
            return newState;

        case actions.DECREMENT:
            newState = {...state};
            newState[action.id].count -= 1;
            return newState;

        case actions.ADD_COUNTER:
            newState = {...state};
            newState[action.id] = {id: action.id, count: action.count }
            return newState;
        
        case actions.REMOVE_COUNTER:
            newState = {...state};
            delete newState[action.id];
            return newState;

        default:
            return state;
    }
}