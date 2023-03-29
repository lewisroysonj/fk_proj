import { Reducer } from "react";
import { AnyAction } from "redux";

export const actions = {
    GET_COUNTRIES: 'GET_COUNTRIES',
    GET_COUNTRIES_SUCCESS: 'GET_COUNTRIES_SUCCESS',
    GET_COUNTRIES_FAIL: 'GET_COUNTRIES_FAIL'
}

const initialState = {
    countries: [],
    loading: false
}

export const countryReducer: any = (state: any, action: AnyAction,) => {
    if (action.type === actions.GET_COUNTRIES) {
    return {
        ...initialState,
        loading: true
    }
   } else if (action.type === actions.GET_COUNTRIES_SUCCESS) {
    return {
        ...initialState,
        countries: action.countries,
        loading: false
    }
   } else if (action.type === actions.GET_COUNTRIES_FAIL) {
    return {
        ...initialState,
        loading: false
    }
   } else {
    return initialState
   }
}