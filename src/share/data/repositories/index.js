import axios from "../../../config/axiosInit";
import axiosGiphy from "../../../config/axiosGiphy";
import config from "../../../config/configApi";


export const getDataRepo = async () => {
    try {
        const { data } = await axios.get();
        return data
    } catch (error) {
        throw error
    }
}

export const getDataFilteredRepo = async (params) => {
    try {
        const { data } = await axios.get('', {params});
        return data
    } catch (error) {
        throw error
    }
}

export const createNewDataRepo = async (formValues) => {
    try {
        const { data } = await axios.post('', formValues, config());
        return data
    } catch (error) {
        throw error
    }
}

export const updateDataRepo = async (formValues, id) => {
    try {
        const { data } = await axios.put(`${id}`, formValues, config());
        return data
    } catch (error) {
        throw error
    }
}

export const getDataByIdRepo = async (id) => {
    try {
        const { data } = await axios.get(`${id}`)
        return data
    } catch (error) {
        throw error
    }
}

export const getGifsRepo = async (category) => {
    try {
        const { data } = await axiosGiphy.get('',{
            params:{q: category, limit: 20}
        });
        return data
    } catch (error) {
        throw error
    }
}
