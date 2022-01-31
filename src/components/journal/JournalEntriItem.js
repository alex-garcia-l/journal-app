import React from 'react';

export const JournalEntriItem = () => {
  return (
    <div className="journal__entry">
      <div
        className="journal__entry-picture"
        style={{
          backgroundImage: 'url("https://www.publicdomainpictures.net/pictures/320000/nahled/background-image.png")'
        }}
      ></div>

      <div className="journal__entry-container">
        <div className="journal__entry-body">
          <p className="journal__entry-title">
            Un nuevo día
          </p>

          <p className="journal__entry-content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        <div className="journal__entry-date-box">
          <span>Monday</span>
          <h4>28</h4>
        </div>
      </div>
    </div>
  );
};
