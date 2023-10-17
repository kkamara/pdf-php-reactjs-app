import { combineReducers, } from 'redux'
import authReducer from './authReducer'
import usersReducer from './usersReducer'
import pdfsReducer from './pdfsReducer'

export default combineReducers({
  auth: authReducer,
  users: usersReducer,
  pdfs: pdfsReducer,
})
