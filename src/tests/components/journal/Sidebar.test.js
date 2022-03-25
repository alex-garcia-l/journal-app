/**
 * @jest-environment node
 */

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import { Sidebar } from '../../../components/journal/Sidebar';
import { startLogout } from '../../../actions/auth';
import { startNewNote } from '../../../actions/note';

import 'jsdom-global/register';

jest.mock('../../../actions/auth', () => ({
  startLogout: jest.fn(),
}));

jest.mock('../../../actions/note', () => ({
  startNewNote: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
  auth: {
    id: '123',
    name: 'Nombre de Usuario'
  },
  ui: {
    loading: false,
    msgError: null
  },
  notes: {
    active: null,
    notes: [],
  }
};

let store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <Sidebar />
  </Provider >
);

describe('Prueba en <Sidebar />', () => {

  beforeEach(() => {
    store = mockStore(initialState);
    jest.clearAllMocks();
  });

  test('debe mostrarse correctamente', () => {

    expect(wrapper).toMatchSnapshot();

  });

  test('debe llamar startLogout', () => {

    wrapper.find('button').simulate('click');

    expect(startLogout).toHaveBeenCalled();

  });

  test('debe llamar startNewNote', () => {

    wrapper.find('.journal__new-entry').simulate('click');

    expect(startNewNote).toHaveBeenCalled();

  });

});