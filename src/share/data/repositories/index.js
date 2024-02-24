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

export const createNewDataRepo = async (formValues) => {
    try {
        const { data } = await axios.post('', formValues, config());
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
