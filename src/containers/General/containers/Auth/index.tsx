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

import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Route } from 'react-router-dom';
import { push } from 'react-router-redux';
import { IRootState } from 'modules';

import Login from './containers/Login';
import Import from './containers/Import';
import Register from './containers/Register';

interface IAuthProps {
    navigate: (url: string) => any;
}

const Auth: React.SFC<IAuthProps> = (props) => (
    <div>
        <Route exact path="/auth" component={Login} />
        <Route exact path="/auth/import" component={Import} />
        <Route exact path="/auth/create" component={Register} />
    </div>
);

const mapStateToProps = (state: IRootState) => ({

});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    navigate: (url: string) => dispatch(push(url))
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);