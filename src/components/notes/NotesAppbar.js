import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { startUpdateNote, startUploadImage } from '../../actions/note';

export const NotesAppBar = () => {

  const dispatch = useDispatch();
  const { active: note } = useSelector( state => state.notes );
  const { date } = note;
  const noteDate = moment(date);

  const handleSave = () => {
    dispatch(startUpdateNote(note));
  }

  const handleClick = () => {
    document.querySelector('#uploadFile').click();
  }

  const handleChange = (evt) => {
    const file = evt.target.files[0];

    if (file) {
      dispatch(startUploadImage(file));
    }
  }

  return (
    <div className="notes__appbar">
      <span>{ noteDate.format('MMMM Do YYYY, h:mm:ss a') }</span>

      <input
        id="uploadFile"
        type="file"
        onChange={handleChange}
        style={{ display: 'none' }}
      />

      <div>
        <button
          className="btn btn-primary mr-5"
          onClick={handleClick}
        >
          Picture
        </button>

        <button
          className="btn btn-primary"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};
