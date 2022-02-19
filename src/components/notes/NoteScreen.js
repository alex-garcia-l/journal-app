import { NotesAppbar } from './NotesAppbar';

export const NoteScreen = () => {
  return (
    <div className="notes__main-content">
      <NotesAppbar />

      <div className="notes__content">
        <input 
          type="text"
          placeholder="Some awesome title"
          className="notes__title-input"
        />

        <textarea
          placeholder="What happened today"
          className="notes__title-textarea"
        ></textarea>

        <div className="notes__image">
          <img 
            src="https://fotos-themonkeybusiness.s3.eu-west-3.amazonaws.com/wp-content/uploads/2021/01/05141734/imagen-de-fondo.png"
            alt="imagen"
          />
        </div>
      </div>
    </div>
  );
};
