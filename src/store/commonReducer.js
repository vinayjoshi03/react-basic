import * as actionTypes from './../actions/types'
let commonInitialState = {
    showLoading: false
}

const commonReducer = (state = commonInitialState, action) => {
    switch (action.type) {
        case actionTypes.SHOW_LOADING:
            return {
                ...state,
                showLoading: action.payload.showLoading
            }
    }
    return state;
}

export default commonReducer;