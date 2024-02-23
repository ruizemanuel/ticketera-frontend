import axios from "../../../config/axiosInit";


export const getDataRepo = async () => {
    try {
        const { data } = await axios.get();
        return data
    } catch (error) {
        throw error
    }
}
