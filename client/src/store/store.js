import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'


import authReducer from 'store/user/reducer'
import servicesReducer from 'store/services/reducer'
import messageReducer from 'store/message/reducer'
import categoriesReducer from 'store/categories/reducer'
import serviceFilterReducer from 'store/filter/reducers'

const rootReducers =combineReducers({
    auth: authReducer,
    message: messageReducer,
    services: servicesReducer,
    categories: categoriesReducer,
    serviceFilter : serviceFilterReducer
})

const store = createStore(rootReducers ,composeWithDevTools(applyMiddleware(thunk)) )

export default store