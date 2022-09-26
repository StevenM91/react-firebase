import { ADD_POST, GET_POSTS } from "../actions/post.action";

const initialState = {};

// les ... nous on permis de casser le tableaux du state pour pouvoir à ce que les donnée puisse continuer a s'ajouter sans s'écraser
export default function postReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return action.payload;
    case ADD_POST:
      return [action.payload, ...state];
    default:
      return state;
  }
}
