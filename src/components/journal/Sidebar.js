import React from 'react';
import { JournalEntries } from './JournalEntries';

export const Sidebar = () => {
  return (
    <aside className="journal__sidebar">
      <nav className="journal__sidebar-navbar mt-5">
        <h3>
          <i className="far fa-moon"></i>
          <span className="ml-1">Name</span>
        </h3>

        <button
          className="btn btn-outline-primary"
        >
          Logout
        </button>
      </nav>

      <div className="journal__new-entry">
        <i className="far fa-calendar-plus fa-4x"></i>
        <p className="mt-1">
          New entry
        </p>
      </div>

      <JournalEntries />
    </aside>
  );
};
