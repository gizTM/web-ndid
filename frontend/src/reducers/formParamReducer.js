const formParamReducer = (input, action) => {
    switch (action.type) {
      case 'UPDATE_INPUT':
        return action.value && input
      default:
        return false
    }
  }
  
  export default formParamReducer 