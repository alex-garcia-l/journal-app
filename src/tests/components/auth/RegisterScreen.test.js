/**
 * @jest-environment node
 */

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { RegisterScreen } from '../../../components/auth/RegisterScreen';
import { types } from '../../../types/types';

import 'jsdom-global/register';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  auth: {},
  ui: {
    loading: false,
    msgError: null
  }
};

let store = mockStore(initialState);
let wrapper = mount(
  <Provider store={store}>
    <MemoryRouter >
      <RegisterScreen />
    </MemoryRouter>
  </Provider >
);

describe('Pruebas para <RegisterScreen />', () => {

  beforeEach(() => {
    store = mockStore(initialState);

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter >
          <RegisterScreen />
        </MemoryRouter>
      </Provider >
    );
  });

  test('debe renderizar correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('debe marcar error al registrarse', () => {

    wrapper.find('form').simulate('submit', {
      preventDefault: () => { }
    });

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: types.uiSetError,
      payload: 'Name is required.'
    });

  });

  test('debe mostrar el div del error', () => {

    const initialState = {
      auth: {},
      ui: {
        loading: false,
        msgError: 'Name is required.'
      }
    };

    let store = mockStore(initialState);
    let wrapper = mount(
      <Provider store={store}>
        <MemoryRouter >
          <RegisterScreen />
        </MemoryRouter>
      </Provider >
    );

    expect(wrapper.find('.auth__alert-error').exists()).toBe(true);
    expect(wrapper.find('.auth__alert-error').text().trim()).toBe(initialState.ui.msgError);

  });

});
