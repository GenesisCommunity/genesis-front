// Copyright 2017 The apla-front Authors
// This file is part of the apla-front library.
// 
// The apla-front library is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The apla-front library is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU Lesser General Public License for more details.
// 
// You should have received a copy of the GNU Lesser General Public License
// along with the apla-front library. If not, see <http://www.gnu.org/licenses/>.

import { IRootState } from 'modules';
import { combineEpics, Epic } from 'redux-observable';
import { Action } from 'redux';
import { Observable } from 'rxjs';
import * as actions from './actions';
import keyring from 'lib/keyring';
import api, { ITxStatusResponse } from 'lib/api';

export const contractExecEpic: Epic<Action, IRootState> =
    (action$, store) => action$.ofAction(actions.contractExec.started)
        .flatMap(action => {
            const state = store.getState();
            return Observable.fromPromise(api.txPrepare(state.auth.sessionToken, action.payload.name, action.payload.params)
                .then(response => {
                    const signature = keyring.sign(response.forsign, state.auth.privateKey);
                    return api.txExec(state.auth.sessionToken, action.payload.name, {
                        ...action.payload.params,
                        pubkey: state.auth.account.publicKey,
                        signature,
                        time: response.time
                    });
                }))
                .map(payload => actions.contractExec.done({
                    params: action.payload,
                    result: payload.blockid
                }))
                .catch((error: ITxStatusResponse) => Observable.of(actions.contractExec.failed({
                    params: action.payload,
                    error: error.error || error.errmsg
                })));
        });

export default combineEpics(contractExecEpic);