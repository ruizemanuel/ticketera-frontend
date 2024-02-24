import { loading, success, error, loadingGif } from "../data/redux/appSlice"
import { createNewDataRepo, getDataByIdRepo, getDataFilteredRepo, getDataRepo, getGifsRepo, updateDataRepo } from "../data/repositories"


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

export const getDataFiltered = (params) => async (dispatch) => {
    dispatch(loading())
    try {
        const { data } = await getDataFilteredRepo(params)
        dispatch(success({ data }))
    } catch (e) {
        const { message } = e.response.data
        dispatch(error({ message: message || 'Ocurrio un error' }))
    }
}

export const getGifs = (category) => async (dispatch, getState) => {
    dispatch(loadingGif())
    const { dataToEdit } = getState().app
    try {
        const { data } = await getGifsRepo(category)
        const gifs = data.map( img => {
            return {
                id: img.id,
                title: img.title,
                url: img.images.fixed_height_downsampled.url
            }
        } )
        dispatch(success({ gifs, dataToEdit }))
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

export const updateData = (formValues, id) => async (dispatch) => {
    try {
        const { message } = await updateDataRepo(formValues, id)
        dispatch(success({ message: message }))
    } catch (e) {
        dispatch(error({ message: 'Ocurrio un error al intentar actualizar los datos' }))
    }
}

export const getDataToEdit = (id) => async (dispatch) => {
    dispatch(loading())
    try {
        const {data} = await getDataByIdRepo(id)
        const dataToEdit = data
        dispatch(success({ dataToEdit }))
    } catch (e) {
        dispatch(error())
    }
}