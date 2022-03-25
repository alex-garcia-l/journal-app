/**
 * @jest-environment node
 */

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { startLoadingNotes, startNewNote, startUpdateNote, startUploadImage } from '../../actions/note';
import { db } from '../../database/firebase-config';
import { uploadImage } from '../../helpers/uploadImage';
import { types } from '../../types/types';

const pathUploadFile = 'https://path/photo.jpg';

jest.mock('../../helpers/uploadImage', () => ({
  uploadImage: jest.fn(() => {
    return {
      secure_url: pathUploadFile
    };
    // return Promise.resolve({
    //   secure_url: pathUploadFile
    // });
  })
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  auth: {
    uid: 'Testing_1234'
  },
  notes: {
    active: {
      id: 'I31hsp25nF18iuvZktPS',
      title: 'Title File',
      body: 'Body File'
    }
  }
};

let store = mockStore(initialState);
// global.scrollTo = jest.fn();

describe('Prueba para note', () => {

  beforeEach(() => {
    store = mockStore(initialState);
  });

  const note = {
    id: 'I31hsp25nF18iuvZktPS',
    title: 'Title',
    body: 'Body'
  }

  test('startNewNote debe de crear una nota correctamente', async () => {

    await store.dispatch(startNewNote());

    const actions = store.getActions();
    const payload = {
      id: expect.any(String),
      title: '',
      body: '',
      date: expect.any(Number)
    };

    expect(actions[0]).toEqual({
      type: types.notesActive,
      payload
    });

    expect(actions[1]).toEqual({
      type: types.notesAddNew,
      payload
    });

    const { uid } = store.getState().auth;
    const { id } = actions[0].payload;

    await db.doc(`${uid}/journal/notes/${id}`).delete();

  });

  test('startLoadingNotes debe cargar las notas', async () => {

    const { uid } = store.getState().auth;

    await store.dispatch(startLoadingNotes(uid));
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.notesLoad,
      payload: expect.any(Array)
    });

    const expected = {
      id: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
      date: expect.any(Number),
    }

    expect(actions[0].payload[0]).toMatchObject(expected);

  });

  test('startUpdateNote debe modificar correctamente', async () => {

    const { uid } = store.getState().auth;

    await store.dispatch(startUpdateNote(note));
    const actions = store.getActions();

    expect(actions[0].type).toBe(types.notesUpdated);

    const ref = await db.doc(`${uid}/journal/notes/${note.id}`).get();

    expect(ref.data().title).toBe(note.title);

  });

  test('startUploadImage debe subir un archivo', async () => {

    // const file = new File([], 'photo.jpg');

    uploadImage.mockReturnValue({
      secure_url: pathUploadFile
    });

    await store.dispatch(startUploadImage([]));

    const { uid } = store.getState().auth;
    const ref = await db.doc(`${uid}/journal/notes/${note.id}`).get();

    expect(ref.data().url).toBe(pathUploadFile);
  });
});
