import { MENU } from '../constants'

const menuReducer = (menu = MENU.INIT_NDID, action) => {
    switch (action.type) {
      case 'SWITCH_MENU':
        return action.menu
      default:
        return menu;
    }
  }
  
  export default menuReducer 