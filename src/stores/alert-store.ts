import { createSlice, configureStore} from "@reduxjs/toolkit"

const initialState = {
  type: "",
  message: "",
  alertOn: false,
}

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers:{
    createAlert(state, action:{payload:{type:string,message:string}}){
      state.type = action.payload.type
      state.message = action.payload.message
      state.alertOn = true
    },
    closeAlert(state){
      state.alertOn = false
      state.type = ""
      state.message = ""
    }
  }
})

const store = configureStore({
  reducer: alertSlice.reducer
})

export type RootState = ReturnType<typeof store.getState>

export const actions = alertSlice.actions

export default store