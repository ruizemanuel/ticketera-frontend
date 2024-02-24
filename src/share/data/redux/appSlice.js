
import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    status: null,
    message: null,
    loading: false,
    loadingGif: false,
    data: null,
    gifs: null,
    dataToEdit: null,
  },

  reducers: {

    flushEdit: (state) => {
      state.dataToEdit = null
    },
    loading: (state) => {
      state.loading = true
      state.status = null
      state.message = null
      state.data = null   
      state.dataToEdit = null
    },

    loadingGif: (state) => {
      state.loadingGif = true
    },

    error: (state, { payload }) => {
        state.loading = false
        state.loadingGif = false
        state.message = payload?.message || 'Ocurrio un error'
        state.status = "error"
        state.data = payload?.data || null
        state.gifs = payload?.gifs || null
        state.dataToEdit = null
    },

    success: (state, { payload }) => {
        state.loading = false
        state.loadingGif = false
        state.message = payload.message || null
        state.status = "success"
        state.data = payload.data || null
        state.gifs = payload.gifs || null
        state.dataToEdit = payload.dataToEdit || null
    },
  },
})

export const {
  loading,
  loadingGif,
  error,
  success,
  flushEdit,
  
} = appSlice.actions
