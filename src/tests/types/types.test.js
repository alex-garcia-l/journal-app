import { types } from '../../types/types';

describe('Test para types/types.js', () => { 
  test('Debe ser igual', () => { 
    const typesTest = {
      login: '[Auth] login',
      logout: '[Auth] logout',
    
      uiSetError: '[UI] Set Error',
      uiRemoveError: '[UI] Remove Error',
      uiStartLoading: '[UI] Start loading',
      uiFinishLoading: '[UI] Finish loading',
    
      notesAddNew: '[Notes] New note',
      notesActive: '[Notes] Set active note',
      notesLoad: '[Notes] New Load notes',
      notesUpdated: '[Notes] Update Note',
      notesFileUrl: '[Notes] Update image url',
      notesDelete: '[Notes] Delete note',
      notesLogoutCleaning: '[Notes] Logout cleaning',
    }
    
    expect(types).toEqual(typesTest);
  })
});
