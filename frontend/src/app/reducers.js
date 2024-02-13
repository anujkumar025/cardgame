import {combineReducers} from 'redux'

const initialize = {
    score : 0,
    username : ""
}

function scoreReducer(state=initialize.score, action) {
    if(action.type === 'SCORE_ADDED')
        return action.payload.score;
    return state;
}

function usernameReducer(state = initialize.username, action){
    if(action.type === 'ADDED_USERNAME'){
        return action.payload.username;
    }
    return state; 
}

const rootReducer = combineReducers({
    score : scoreReducer, 
    username : usernameReducer
});

// console.log("rootreducer   ", rootReducer);

export default rootReducer;