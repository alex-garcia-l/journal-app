/**
 * @jest-environment node
 */

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startLoginWithGoogle, startLogin } from '../../../actions/auth';

import 'jsdom-global/register';

jest.mock('../../../actions/auth', () => ({
  startLoginWithGoogle: jest.fn(),
  startLogin: jest.fn(),
}));

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
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <MemoryRouter >
      <LoginScreen />
    </MemoryRouter>
  </Provider >
);

describe('Pruebas para <LoginScreen />', () => {

  beforeEach(() => {
    store = mockStore(initialState);
    jest.clearAllMocks();
  });

  test('debe renderizar correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('debe disparar la acción de handleGoogleLogin', () => {

    wrapper.find('.google-btn').prop('onClick')();

    expect(startLoginWithGoogle).toHaveBeenCalled();
  });

  test('debe disparar el startLogin con sus respectivos valores', () => {

    const email = 'mail@mail.com';
    const password = '1234abcd';

    wrapper.find({ name: "email" }).simulate('change', {
      target: {
        name: 'email',
        value: email
      }
    });

    wrapper.find({ name: "password" }).simulate('change', {
      target: {
        name: 'password',
        value: password
      }
    });

    wrapper.find('form').prop('onSubmit')({ preventDefault: () => { } });

    expect(startLogin).toHaveBeenCalledWith(email, password);
  })

});
