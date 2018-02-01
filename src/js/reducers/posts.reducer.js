const initialState = {
    posts: []
};

export default (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_REQUEST":
        return state;
      case "FETCH_SUCCESS": 
        return {...state, posts: action.payload};
      default:
        return state;
    }
}