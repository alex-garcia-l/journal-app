import Enzyme from 'enzyme';
import { createSerializer } from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Swal from 'sweetalert2';

Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

// const notScroll = () => { };
// Object.defineProperty(window, 'scrollTo', { value: notScroll, writable: true });

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
  close: jest.fn(),
}));