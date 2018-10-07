import * as actions from '../actions'

const initialState = {
    couriers: [],
    center: { lat: 55.751244, lng: 37.618423 },
};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actions.RECEIVE_COURIERS: {
            console.log('couriers received');
            return {
                ...state,
                couriers: action.couriers,
            };
        }

        case actions.CHANGE_CENTER: {
            return {
                ...state,
                center: action.newCenter,
            }
        }

        default: {
            return state;
        }

    }
};

export default reducer;
