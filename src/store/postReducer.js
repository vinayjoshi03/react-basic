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
  lastDeletedPost: {},
  currentPage: 1,
  samplePosts: []
}

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.VIEW_ALL:
      return {
        ...state,
        posts: action.payload.posts,
        totalPostsCount: action.payload.totalPostCount
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
        lastDeletedPost: lastPost,
        totalPostsCount: action.payload.data.totalPostsCount
      }

    case actionTypes.CREATE_POST:
      return {
        ...state,
        posts: action.payload.data.allPosts,
        totalPostsCount: action.payload.data.totalPost,
        addPostSuccess: false
      }
    case actionTypes.GET_ALL_SAMPLE_POSTS:
      return {
        ...state,
        samplePosts:action.payload
      }
    default:
  }
  return state;
}
export default postReducer;