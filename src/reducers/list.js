const GET_DATA = "GET_DATA";
const UPDATE_DATA = "UPDATE_DATA";
const REMOVE_DATA = "REMOVE_DATA";
const REMOVE_CARD = "REMOVE_CARD";

export const addList = (data) => {
  return {
    type: GET_DATA,
    data,
  };
};

export const updateData = (data, listId) => {
  return {
    type: UPDATE_DATA,
    data,
    listId,
  };
};

export const removeData = (id) => {
  return {
    type: REMOVE_DATA,
    id,
  };
};
export const removeCardItem = (id, listId) => {
  return {
    type: REMOVE_CARD,
    id,
    listId,
  };
};
const initialState = [];

export const list = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA:
      return [...state, action.data];
    case UPDATE_DATA:
      let updateList = state.find((v) => {
        return v.id === action.listId;
      });

      let updateResult = updateList.content.find((v) => {
        return v.id === action.data.id;
      });
      Object.assign(updateResult, action.data);
      return state;
    case REMOVE_CARD:
      let cardList = state.find((v) => {
        return v.id === action.listId;
      });
      let currentIndex = cardList.content.findIndex((v) => {
        return v.id === action.id;
      });
      cardList.content.splice(currentIndex, 1);
      return state;
    case REMOVE_DATA:
      return state.filter((tem) => tem.id !== action.id);
    default:
      return state;
  }
};
