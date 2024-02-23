import { loading, success, error } from "../data/redux/appSlice"
import { getDataRepo } from "../data/repositories"


export const getData = () => async (dispatch) => {
    dispatch(loading())
    try {
        const { data } = await getDataRepo()
        dispatch(success({ data }))
    } catch (e) {
        const { message } = e.response.data
        dispatch(error({ message: message || 'Ocurrio un error' }))
    }
}
