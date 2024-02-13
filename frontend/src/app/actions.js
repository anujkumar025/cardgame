import { SCORE_ADDED, ADDED_USERNAME } from "./actionTypes";

export const addScore = (number) =>({
    type: SCORE_ADDED,
    payload: {score : number}
})

export const setuserName = (text) => ({
    type: ADDED_USERNAME,
    payload: {username : text}
})