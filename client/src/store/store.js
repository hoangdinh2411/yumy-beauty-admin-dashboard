import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'


import authReducer from 'store/user/reducer'
import messageReducer from 'store/message/reducer'

const rootReducers =combineReducers({
    auth: authReducer,
    message: messageReducer
})

const store = createStore(rootReducers ,composeWithDevTools(applyMiddleware(thunk)) )

export default store