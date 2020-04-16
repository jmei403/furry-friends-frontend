export default (state = [], action) => {
  switch (action.type) {
    case "SET_MY_PETS":
      return action.pets;
    case "CLEAR_MY_PETS":
      return state
    case "ADD_MY_PET":
      return [...state, action.pet]
    default:
      return state
  }
}
