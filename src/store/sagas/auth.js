import { delay } from 'redux-saga';
import { put } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions/index';

export function* logoutSaga (action) {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');

  yield put(actions.logoutSuccessed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);

  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart);

  const authData = {
      email: action.email,
      password: action.password,
      returnSecureToken: true
  };
  let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDk2imQmN0p4OYCCxMH-sKFQCvuibxtKGo';
  if (!action.isSignup) {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDk2imQmN0p4OYCCxMH-sKFQCvuibxtKGo'
  }

  try {
  const res = yield axios.post(url, authData);
  
  const expirationDate = yield new Date(new Date().getTime() + res.data.expiresIn * 1000);
  yield localStorage.setItem('token', res.data.idToken);
  yield localStorage.setItem('userId', res.data.localId);
  yield localStorage.setItem('expirationDate', expirationDate);
  yield put(actions.authSuccess(res.data.idToken, res.data.localId));
  yield put(actions.checkAuthTimeout(res.data.expiresIn));
      

  } catch(error) {
    console.log(error);
    yield put(actions.authFail(error.response.data.error));
  };
}