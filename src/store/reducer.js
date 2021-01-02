let initialState = {
    counter:20,
    users:{},
    isLoaded:false
}

const userReducer = (state = initialState, action) => {

    if(action.type === 'INC_COUNT') {
        return {
            ...initialState,
            counter:state.counter+1 
        }
    }

    if(action.type === 'Add_USERS'){
      return {...initialState,
        users:action.usersData,
        isLoaded:action.isLoaded
      }


    }
    return state;
}

export default userReducer;