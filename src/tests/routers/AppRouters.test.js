// /**
//  * @jest-environment node
//  */

// import configureStore from 'redux-mock-store';
// import { mount } from 'enzyme';
// import thunk from 'redux-thunk';
// import { Provider } from 'react-redux';
// import { MemoryRouter } from 'react-router-dom';
// import { act } from '@testing-library/react';

// import { login } from '../../actions/auth';
// import { AppRouters } from '../../routers/AppRouters';
// import { firebase } from '../../database/firebase-config'

// import 'jsdom-global/register';

// jest.mock('../../actions/auth', () => ({
//   login: jest.fn(),
// }));

// const middlewares = [thunk];
// const mockStore = configureStore(middlewares);

// const initialState = {
//   auth: {},
//   ui: {
//     loading: false,
//     msgError: null
//   },
//   notes: {
//     notes: [],
//     active: null
//   }
// };

// let store = mockStore(initialState);
// store.dispatch = jest.fn();

// describe('Pruebas para el componente <AppRouter />', () => {

//   test('debe llamar login', async () => {

//     let user;

//     await act(async () => {

//       const email = 'test@testing.com';
//       const password = 'abcd1234';

//       const userDB = await firebase.auth().signInWithEmailAndPassword(email, password);
//       user = userDB.user;

//       const wrapper = mount(
//         <Provider store={store}>
//           <MemoryRouter initialEntries={['/auth/login']} >
//             <AppRouters />
//           </MemoryRouter>
//         </Provider >
//       )

//     });

//     expect(login).toHaveBeenCalled();

//   });

// });
