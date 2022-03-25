import {
  setError,
  removeError,
  startLoading,
  finishLoading
} from '../../actions/ui';
import { types } from '../../types/types';

describe('Prueba para ui', () => {

  test('debe de retornar objetos correctamente', () => {

    const error = 'Error';
    const resError = setError(error);

    expect(resError).toEqual({
      type: types.uiSetError,
      payload: error
    });

    const resRemoveError = removeError();
    expect(resRemoveError).toEqual({ type: types.uiRemoveError });

    const resStartLoading = startLoading();
    expect(resStartLoading).toEqual({ type: types.uiStartLoading });

    const resFinishLoading = finishLoading();
    expect(resFinishLoading).toEqual({ type: types.uiFinishLoading });


  });
});
