import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setNoteActive, startDeleteNote } from '../../actions/note';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar';

export const NoteScreen = () => {

  const dispatch = useDispatch();
  const { active: note } = useSelector( state => state.notes );
  let [ formValues, handleInputChange, resetForm ] = useForm(note);
  const { title, body, id } = formValues;
  const activeId = useRef(note.id)

  useEffect(() => {
    if (note.id !== activeId.current) {
      resetForm(note);
      activeId.current = note.id
    }
  }, [note, resetForm]);

  useEffect(() => {
    dispatch(setNoteActive(formValues.id, {...formValues}));
  }, [formValues, dispatch]);
  
  const handleDelete = () => {
    dispatch(startDeleteNote(id));
  }

  return (
    <div className="notes__main-content animate__animated animate__fadeIn">
      <NotesAppBar />

      <div className="notes__content">
        <input 
          type="text"
          placeholder="Some awesome title"
          className="notes__title-input"
          autoComplete="off"
          name="title"
          onChange={handleInputChange}
          value={title}
        />

        <textarea
          placeholder="What happened today"
          className="notes__title-textarea"
          autoComplete="off"
          name="body"
          onChange={handleInputChange}
          value={body}
        ></textarea>

        {
          note.url && 
          (
            <div className="notes__image">
              <img 
                src={note.url}
                alt={title}
              />
            </div>
          )
        }
      </div>
      <button
        className="btn btn-third"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};
