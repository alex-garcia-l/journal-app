import Swal from 'sweetalert2';

import { types } from '../types/types';
import { finishLoading, startLoading } from './ui';
import { firebase, googleAuthProvider } from '../database/firebase-config';
import { purgeNotes } from './note';

export const startLogin = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
        dispatch(finishLoading());
      })
      .catch(error => {
        dispatch(finishLoading());
        Swal.fire('Error', error.message, 'error');
      });
  }
}

export const startLoginWithGoogle = () => {
  return (dispatch) => {
    firebase.auth().signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      });
  }
}

export const startUserRegister = (name, email, password) => {
  return (dispatch) => {
    dispatch(startLoading());
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        await user.updateProfile({ displayName: name });
        dispatch(login(user.uid, user.displayName));
        dispatch(finishLoading());
      })
      .catch(error => {
        dispatch(finishLoading());
        Swal.fire('Error', error.message, 'error');
      });
  }
}

export const startLogout = () => {
  return async (dispatch) => {
    await firebase.auth().signOut();
    dispatch(logout());
    dispatch(purgeNotes());
  }
}

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName
  }
})

export const logout = () => ({
  type: types.logout
})
