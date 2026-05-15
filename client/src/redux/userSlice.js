import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: null
    },
    reducers: {
        // userData ki initial value ko change kr deta hai
        setUserData: (state, action) => {
            state.userData = action.payload
        }
    }
})

export const {setUserData} = userSlice.actions

export default userSlice.reducer