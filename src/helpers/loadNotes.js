import { db } from '../database/firebase-config';


export const loadNotes = async (uid) => {
  const notesDB = await db.collection(`${uid}/journal/notes`).get();
  const notes = [];

  notesDB.forEach(note => {
    notes.push({
      id: note.id,
      ...note.data()
    });
  });

  return notes;
}