const menuReducer = (menu = 0, action) => {
    switch (action.type) {
      case 'SWITCH_MENU':
        return action.menu
      default:
        return menu;
    }
  }
  
  export default menuReducer 