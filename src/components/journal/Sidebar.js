import { useDispatch, useSelector } from 'react-redux';

import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/note';
import { JournalEntries } from './JournalEntries';

export const Sidebar = () => {

  const dispatch = useDispatch();
  const { name } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(startLogout());
  }

  const handleNewNote = () => {
    dispatch(startNewNote());
  }

  return (
    <aside className="journal__sidebar">
      <nav className="journal__sidebar-navbar mt-5">
        <h3>
          <i className="far fa-moon"></i>
          <span className="ml-1">{name}</span>
        </h3>

        <button
          className="btn btn-outline-primary"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>

      <div
        className="journal__new-entry"
        onClick={handleNewNote}
      >
        <i className="far fa-calendar-plus fa-4x"></i>
        <p className="mt-1">
          New entry
        </p>
      </div>

      <JournalEntries />
    </aside>
  );
};
