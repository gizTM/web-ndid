const formReducer = (input = '', action) => {
    switch (action.type) {
      case 'LOADING':
        return action.loading
      default:
        return input;
    }
  }
  
  export default formReducer 