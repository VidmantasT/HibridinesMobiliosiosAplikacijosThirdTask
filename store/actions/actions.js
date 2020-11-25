import {fetchApi} from '../../service/api'

export function addAdvertisement(title, price, id) {
    return {type: 'ADD_ADVERTISEMENT', title: title, price: price, id: id};
}

export function showAll() {
    return {type: 'SHOW_ALL'};
}

export function deleteAdvertisement(id){
    return{type: 'DELETE_ADVERTISEMENT', id: id};
}

export function editAdvertisement(id) {
    return{type: 'EDIT_ADVERTISEMENT', id: id};
}

export const createNewUser = async (payload) => {
    
    const response = await fetchApi()
    
    return {
        type: "User",
        payload: "adsasdasd"
    }
}