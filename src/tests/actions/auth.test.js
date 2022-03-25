/**
 * @jest-environment node
 */

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { login, logout, startLogin, startLogout } from '../../actions/auth';
import { types } from '../../types/types';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {};

let store = mockStore(initialState);

describe('Pruebas para las acciones de Auth', () => {

  beforeEach(() => {
    store = mockStore(initialState);
  })

  test('debe llamar las acciones login y logout correctamente', () => {

    const uid = 'ABCD';
    const displayName = 'Name';

    const loginAction = login(uid, displayName);
    const logoutAction = logout();

    expect(loginAction).toEqual({
      type: types.login,
      payload: {
        uid,
        displayName
      }
    });

    expect(logoutAction).toEqual({
      type: types.logout
    });
  });

  test('startLogout debe de iniciar el logout', async () => {

    await store.dispatch(startLogout());

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.logout
    });

    expect(actions[1]).toEqual({
      type: types.notesLogoutCleaning
    });
  });

  test('startLogin debe de iniciar el login', async () => {

    await store.dispatch(startLogin('test@testing.com', 'abcd1234'));
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.uiStartLoading
    });

    expect(actions[1]).toEqual({
      type: types.login,
      payload: {
        uid: expect.any(String),
        displayName: null
      }
    });

    expect(actions[2]).toEqual({
      type: types.uiFinishLoading
    });
  });

});
