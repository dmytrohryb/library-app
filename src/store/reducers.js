import {combineReducers} from "redux";
import {personalBlockReducer} from './PersonalBlock/reducers'

export default combineReducers({
    personalBlock: personalBlockReducer
})
