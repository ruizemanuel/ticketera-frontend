import { loading, success, error, loadingGif } from "../data/redux/appSlice"
import { createNewDataRepo, getDataRepo, getGifsRepo } from "../data/repositories"


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

export const getGifs = (category) => async (dispatch) => {
    dispatch(loadingGif())
    try {
        const { data } = await getGifsRepo(category)
        const gifs = data.map( img => {
            return {
                id: img.id,
                title: img.title,
                url: img.images.fixed_height_downsampled.url
            }
        } )
        dispatch(success({ gifs }))
    } catch (e) {
        console.log(e);
        const { message } = e.response.data
        dispatch(error({ message: message || 'Ocurrio un error' }))
    }
}

export const createNewData = (formValues) => async (dispatch, getState) => {
    const { data } = getState().app;
    try {
        const { message } = await createNewDataRepo(formValues)
        dispatch(success({ dataToEdit: null, message: message, data }))
    } catch (e) {
        const { message } = e.response.data
        dispatch(error({ message: message }))
    }

}