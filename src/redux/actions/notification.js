import * as types from '../constants';

export const closeNotification = () => ({
    type: types.CLOSE_NOTIFICATION,
})

export const notify = message => ({
    type: types.NOTIFY,
    payload: {message}
})