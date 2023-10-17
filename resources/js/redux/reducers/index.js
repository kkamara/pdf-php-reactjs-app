import { combineReducers, } from 'redux'
import authReducer from './authReducer'
import usersReducer from './usersReducer'
import pdfsReducer from './pdfsReducer'
import pdfReducer from './pdfReducer'

export default combineReducers({
  auth: authReducer,
  users: usersReducer,
  pdfs: pdfsReducer,
  pdf: pdfReducer,
})
