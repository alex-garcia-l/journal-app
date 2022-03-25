/**
 * @jest-environment node
 */

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import { NoteScreen } from '../../../components/notes/NoteScreen';
import { setNoteActive } from '../../../actions/note';

import 'jsdom-global/register';

jest.mock('../../../actions/note', () => ({
  setNoteActive: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const id = 'bkqgO47fuY5fLRHqrMTO';

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
    active: {
      id,
      title: 'Title',
      body: 'Body',
      date: 1648183494210
    },
    notes: [{
      id: "bkqgO47fuY5fLRHqrMTO",
      title: "",
      body: "",
      date: 1648183494210
    }],
  }
};

let store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <NoteScreen />
  </Provider >
);

describe('Pruebas en <NoteScreen />', () => {

  test('debe mostrarse correctamente', () => {

    expect(wrapper).toMatchSnapshot();

  });

  test('debe de llamar setNoteActive correctamente', () => {

    const newTitle = 'Body Test';

    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: newTitle
      }
    });

    expect(setNoteActive).toHaveBeenLastCalledWith(id, {
      id,
      title: newTitle,
      body: 'Body',
      date: 1648183494210
    })

  });

});
