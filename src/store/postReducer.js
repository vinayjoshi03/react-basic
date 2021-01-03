import * as actionTypes from './../actions/types'

let initialState = {
  posts: [],
  showLoading: false,
  showError: false,
  errorMessage: '',
  pageCount: 10,
  totalPostsCount: 0,
  addPostSuccess: false,
  selectedPostData: {},
  lastDeletedPost: {}
}

const postReducer = (state = initialState, action) => {
  switch (action.type) {

    case actionTypes.SHOW_LOADING:
      return {
        ...state,
        showLoading: action.payload.showLoading
      }

    case actionTypes.VIEW_ALL:
      const allPosts = action.payload;
      return {
        ...state,
        posts: allPosts,
        totalPostsCount: action.totalPostsCount
      }

    case actionTypes.SHOW_ERROR:
      return {
        ...state,
        showError: true,
        errorMessage: action.payload.message
      }

    case actionTypes.SHOW_ADD_SUCCESS:
      return {
        ...state,
        addPostSuccess: action.payload.status
      }
    case actionTypes.POST_DETAILS:
      const selectedPost = action.payload.data;


      return {
        ...state,

        selectedPostData: selectedPost
      }
    case actionTypes.DELETE_POST:
      const lastPost = action.payload.data;
      const newPosts = state.posts.filter((data) => {
        return action.payload.data.id !== data.id;
      });
      return {
        ...state,
        posts: newPosts,
        lastDeletedPost: lastPost
      }
    default:
  }
  return state;
}
export default postReducer;