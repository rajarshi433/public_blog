import { createSlice } from "@reduxjs/toolkit";

import { GoogleAuthProvider, signOut, signInWithPopup } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";

import axios from "axios";


const authSlice = createSlice({
    name: 'auth',

    initialState: {
        uid: null,
        _id: null,
        email: null,
        displayName: null,
        photoURL: null,
    },

    reducers: {
        removeUser(state, action) {
            state.uid = null;
            state._id = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
        },

        addUser(state, action) {
            state['uid'] = action.payload.uid;
            state['email'] = action.payload.email;
            state['displayName'] = action.payload.displayName;
            state['photoURL'] = action.payload.photoURL;
        },

        addId(state, action) {
            state['_id'] = action.payload.data;
        }
    }
});

export const { removeUser, addUser, addId } = authSlice.actions;
export default authSlice.reducer;


// Thunks
export function signInWithGoogle() {
    return async (dispatch) => {
        try {
            const googleAuthProvider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, googleAuthProvider);
            dispatch(addUser(result.user));
            await axios.post('http://localhost:8000/login',
                {
                    uid: result.user.uid,
                    displayName: result.user.displayName,
                    photoURL: result.user.photoURL
                })

            const id = await axios.get(`http://localhost:8000/getid/${result.user.uid}`)
            dispatch(addId(id))
        }
        catch (error) {
            console.log("Error 1 - ", error.message);
        }

    }
}

export function logout() {
    return async (dispatch) => {
        try {
            await signOut(auth);
            dispatch(removeUser())
        } catch (error) {
            alert(error.message);
        }
    }
}
