const initialState = {
  message : ''
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case 'ADD_FLASH':
      return {
        message: action.message
      }
    default: return state;
  }
}
