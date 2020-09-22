const GET_DATA = "GET_DATA";

export const addList = (data) => {
  return {
    type: GET_DATA,
    data,
  };
};

const initialState = [];

export const list = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA:
      return [...state, action.data];
    default:
      return state;
  }
};
