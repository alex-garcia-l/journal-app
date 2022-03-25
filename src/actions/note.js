import Swal from 'sweetalert2';
import { db } from '../database/firebase-config';
import { types } from '../types/types';
import { loadNotes } from '../helpers/loadNotes';
import { uploadImage } from '../helpers/uploadImage';

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime()
    }

    const doc = await db.collection(`${uid}/journal/notes`).add(newNote);
    dispatch(setNoteActive(doc.id, newNote));
    dispatch(addNewNote(doc.id, newNote));
  }
}

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  }
}

export const startUpdateNote = (note) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    if (!note.url) {
      delete note.url;
    }

    const noteUpdate = { ...note };
    delete noteUpdate.id;

    await db.doc(`${uid}/journal/notes/${note.id}`).update(noteUpdate);

    dispatch(refreshNotes(note.id, noteUpdate));

    Swal.fire({
      title: 'Success',
      text: 'Note modified',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500
    });
  }
}

export const startUploadImage = (file) => {
  return async (dispatch, getState) => {
    const { active: note } = getState().notes;

    Swal.fire({
      title: 'Uploading',
      text: 'Please wait...',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {
        Swal.hideLoading()
      },
    });

    const upload = await uploadImage(file);
    note.url = upload.secure_url;
    dispatch(startUpdateNote(note));

    Swal.close();
  }
}

export const startDeleteNote = (id) => {
  return (dispatch, getState) => {

    Swal.fire({
      title: 'Are you sure you want to delete the note?',
      confirmButtonText: 'Yes, delete',
      showCancelButton: true,
      icon: 'question',
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const { uid } = getState().auth;

        await db.doc(`${uid}/journal/notes/${id}`).delete();
        dispatch(deleteNote(id));
      }
    })
  }
}

export const setNoteActive = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note
  }
});

export const addNewNote = (id, note) => ({
  type: types.notesAddNew,
  payload: {
    id,
    ...note
  }
});

export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes
});

export const deleteNote = (id) => ({
  type: types.notesDelete,
  payload: id
});

export const refreshNotes = (id, note) => ({
  type: types.notesUpdated,
  payload: {
    id,
    note: {
      id,
      ...note
    }
  }
});

export const purgeNotes = () => ({
  type: types.notesLogoutCleaning
})
