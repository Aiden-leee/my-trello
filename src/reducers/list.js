const GET_DATA = "GET_DATA";
const CREATE_CARD = "CREATE_CARD";

export const addList = (data) => {
  return {
    type: GET_DATA,
    data,
  };
};

export const createCard = (data) => {
  return {
    type: CREATE_CARD,
    data,
  };
};

const initialState = [];

export const list = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA:
      return [...state, action.data];
    case CREATE_CARD:
      return console.log(action.data);
    default:
      return state;
  }
};
