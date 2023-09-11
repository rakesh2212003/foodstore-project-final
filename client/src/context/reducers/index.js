import { combineReducers } from 'redux'

import userReducer from './UserReducer'

const myReducers = combineReducers({
    user: userReducer,
})

export default myReducers