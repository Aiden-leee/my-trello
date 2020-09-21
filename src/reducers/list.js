const GET_DATA = "GET_DATA";

const initialState = {
  title: "",
};

export const list = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA:
      return state;
    default:
      return state;
  }
};
