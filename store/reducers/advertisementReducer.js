const initialState = {
    advertisements: [],
}

export const advertisementReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_ALL':
            return {
                advertisements: [...state.advertisements],
            };
        case 'ADD_ADVERTISEMENT':
            return {
                advertisements: [
                    ...state.advertisements,
                    {
                        title: action.title,
                        price: action.price,
                        id: action.id,
                    }
                ]
            }
        case 'DELETE_ADVERTISEMENT':
            const index = state.advertisements.findIndex((advertisement) => advertisement.id === action.id);
            return {
                advertisements: [...state.advertisements.slice(0, index), ...state.advertisements.slice(index + 1)],
            };
        case 'EDIT_ADVERTISEMENT':
            const index1 = state.advertisements.findIndex((advertisement) => advertisement.id === action.id);
            return {
                   advertisements: [...state.advertisements[index1], {title: 'hello'}] // nesamone cia, neveikia
            }
        default:
            return state;
    }
}