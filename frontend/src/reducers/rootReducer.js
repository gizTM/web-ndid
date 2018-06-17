import { combineReducers } from 'redux'
import menuReducer from './menuReducer'
import formReducer from './formReducer'
import formParamReducer from './formParamReducer'

export default combineReducers({
  menu: menuReducer,
  loading: formReducer,
  input: formParamReducer
})