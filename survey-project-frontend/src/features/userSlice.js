import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {},
    },
    reducers: {
        storeUser: (state, data) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.user = data
        },
    },
})

// Action creators are generated for each case reducer function
export const currentUser = (state) => state.user.value

export const { storeUser } = userSlice.actions

export default userSlice.reducer