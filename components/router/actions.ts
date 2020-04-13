import { UPDATE_PATH } from './actionTypes';

/**
 * Triggers navigation
 *
 * @function
 * @param {String} payload A path string
 * @return {void} The {@link actionTypes.UPDATE_PATH UPDATE_PATH} action.
 */
export const updateTransactions = (payload: String) => ({
    payload,
    type: UPDATE_PATH,
});
