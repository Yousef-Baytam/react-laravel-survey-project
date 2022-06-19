import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
    },
    reducers: {
        storeUser: (state, data) => {
            state.user = data
        },
    },
})

// Action creators are generated for each case reducer function
export const currentUser = (state) => state.user.value

export const { storeUser } = userSlice.actions

export default userSlice.reducer