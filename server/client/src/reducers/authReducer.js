import { FETCH_USER } from '../actions/types';

// Has 3 states null, user object or false
export default function(state = null, action) {
    switch (action.type) {
        case FETCH_USER:
            return action.payload || false;
        default:
            return state;
    }
}