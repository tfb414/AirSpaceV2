import * as actions from '../actions';
import {combineReducers} from 'redux';

const user = (state={}, action) => {
    switch(action.type) {
        case actions.SETGUESTID:
            let newState = {...state};
            newState["guest_id"] = action.guest_id;
            return newState;

        case actions.SETHOSTID:
            newState = {...state};
            newState["host_id"] = action.host_id;
            return newState;

        default:
            return state;
    }
}

const connection = (state={}, action) => {
    switch(action.type) {
        case actions.SETCONNECTION:
            return action.connection;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    user,
    connection
})

export default rootReducer;