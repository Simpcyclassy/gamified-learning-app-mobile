const reducer = (state = {foo: ''}, action: any) => {
  switch (action.type) {
    case 'FOO':
      return {...state, foo: action.payload};
    default:
      return state;
  }
};

export default reducer;
