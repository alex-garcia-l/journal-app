import { useDispatch } from 'react-redux';
import moment from 'moment';
import { setNoteActive } from '../../actions/note';

export const JournalEntryItem = ({ id, title, body, date, url }) => {

  const dispatch = useDispatch();
  const noteDate = moment(date);

  const note = {
    title,
    body,
    date,
    url
  }

  if (title.length > 30) {
    title = title.substring(0, 30) + '...';
  }

  if (body.length > 90) {
    body = body.substring(0, 90) + '...';
  }

  const handleClick = () => {    
    dispatch(setNoteActive(id, note));
  }

  return (
    <div
      className="journal__entry animate__animated animate__fadeIn"
      onClick={handleClick}
    >
      
      {
        url &&
        <div
          className="journal__entry-picture"
          style={{
            backgroundImage: `url(${url})`
          }}
        ></div>
      }

      <div className="journal__entry-container">
        <div className="journal__entry-body">
          <p className="journal__entry-title">
            { title }
          </p>

          <p className="journal__entry-content">
            { body }
          </p>
        </div>

        <div className="journal__entry-date-box">
          <span>{ noteDate.format('dddd') }</span>
          <h4>{ noteDate.format('Do') }</h4>
        </div>
      </div>
    </div>
  );
};
