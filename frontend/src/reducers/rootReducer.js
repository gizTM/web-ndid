import { combineReducers } from 'redux'
import menuReducer from './menuReducer'
import formReducer from './formReducer'
import formParamReducer from './formParamReducer'
import { reducer as burgerMenu } from 'redux-burger-menu'

export default combineReducers({
  menu: menuReducer,
  loading: formReducer,
  input: formParamReducer,
  burgerMenu
})