import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

describe('Prueba para authReducer', () => {

  test('debe iniciar sesión', () => {

    const uid = '1234';
    const name = 'Owner';
    const initialState = {};
    const action = {
      type: types.login,
      payload: {
        uid,
        displayName: name
      }
    }

    const res = authReducer(initialState, action);
    expect(res).toEqual({ uid, name });

  });

  test('debe cerrar sesión', () => {

    const initialState = {
      uid: '1234',
      name: 'Owner'
    };

    const action = {
      type: types.logout,
    }

    const res = authReducer(initialState, action);
    expect(res).toEqual({});

  });

  test('no debe cambiar el state', () => {

    const initialState = {
      uid: '1234',
      name: 'Owner'
    };

    const action = {
      type: types.somting,
    }

    const res = authReducer(initialState, action);
    expect(res).toEqual(initialState);

  });
})