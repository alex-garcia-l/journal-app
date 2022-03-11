import { useSelector } from 'react-redux';
import { JournalEntryItem } from './JournalEntryItem';

export const JournalEntries = () => {

  const { notes } = useSelector( state => state.notes );

  return (
    <div className="journal__entries">
      {
        notes.map(note => (
          <JournalEntryItem
            key={note.id}
            { ...note }
          />
        ))
      }
    </div>
  );
};
