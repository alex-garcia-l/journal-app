import React from 'react';

export const NotesAppbar = () => {
  return (
    <div className="notes__appbar">
      <span>23 sep 2020</span>
      <div>
        <button
          className="btn btn-primary mr-5"
        >
          Picture
        </button>

        <button
          className="btn btn-primary"
        >
          Save
        </button>
      </div>
    </div>
  );
};
