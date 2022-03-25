/**
 * @jest-environment node
 */

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import { JournalEntryItem } from '../../../components/journal/JournalEntryItem';
import { setNoteActive } from '../../../actions/note';

import 'jsdom-global/register';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {};

let store = mockStore(initialState);
store.dispatch = jest.fn();

const note = {
  id: 'abcd',
  title: 'Title',
  body: 'Body',
  date: 1231235,
  url: 'https://localhost/image.jpg',
}

const wrapper = mount(
  <Provider store={store}>
    <JournalEntryItem {...note} />
  </Provider >
);

describe('Pruebas en el componente <JournalEntryItem />', () => {

  test('debe mostrarse correctamente', () => {

    expect(wrapper).toMatchSnapshot();

  });

  test('debe llamar setNoteActive', () => {

    wrapper.find('.journal__entry').prop('onClick')();

    expect(store.dispatch).toBeCalledWith(setNoteActive(note.id, note));

  });

});
