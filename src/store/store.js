import {createStore, combineReducers} from 'redux'
import rulesReducer from './Rules/Rules.reducer'

const rootReducer = combineReducers({
    rules: rulesReducer,
})

const store = createStore(rootReducer)

export default store