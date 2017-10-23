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
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { IRootState } from 'modules';
import { setCollapsed } from 'modules/engine/actions';
import { menuPop, menuPush, menuInit } from 'modules/content/actions';

import Main, { IMainProps } from 'components/Main';
import Tables from 'containers/Main/containers/Admin/Tables';
import TablesCreate from 'components/Main/Admin/Tables/Create';
import TablesEdit from 'containers/Main/containers/Admin/Tables/EditTable';
import TablesAddColumn from 'containers/Main/containers/Admin/Tables/AddColumn';
import TablesEditColumn from 'containers/Main/containers/Admin/Tables/EditColumn';
import TablesView from 'containers/Main/containers/Admin/Tables/View';
import Interface from 'containers/Main/containers/Admin/Interface';
import CreatePage from 'containers/Main/containers/Admin/Interface/CreatePage';
import EditPage from 'containers/Main/containers/Admin/Interface/EditPage';
import CreateMenu from 'components/Main/Admin/Interface/CreateMenu';
import EditMenu from 'containers/Main/containers/Admin/Interface/EditMenu';
import CreateBlock from 'components/Main/Admin/Interface/CreateBlock';
import EditBlock from 'containers/Main/containers/Admin/Interface/EditBlock';
import Contracts from 'containers/Main/containers/Admin/Contracts';
import CreateContract from 'containers/Main/containers/Admin/Contracts/Create';
import Languages from 'containers/Main/containers/Admin/Languages';
import CreateLanguage from 'components/Main/Admin/Languages/Create';
import EditLanguage from 'containers/Main/containers/Admin/Languages/Edit';
import EditContract from 'containers/Main/containers/Admin/Contracts/Edit';
import Parameters from 'containers/Main/containers/Admin/Parameters';
import ParametersCreate from 'components/Main/Admin/Parameters/Create';
import ParametersEdit from 'containers/Main/containers/Admin/Parameters/Edit';
import DefaultPage from 'containers/Main/containers/DefaultPage';
import Page from 'containers/Main/containers/Page';
import Debug from 'containers/Main/containers/Debug';
import Backup from 'containers/Main/containers/Backup';
import NotFound from 'containers/Main/containers/NotFound';

class MainContainer extends React.Component<IMainProps & { menuInit: typeof menuInit.started }> {
    componentDidMount() {
        this.preloadMenu(this.props);
    }

    componentWillReceiveProps(props: IMainProps) {
        this.preloadMenu(props);
    }

    preloadMenu(props: IMainProps) {
        if (!props.pending && !props.menus.find(l => l.name === 'default_menu')) {
            this.props.menuInit({
                session: props.session
            });
        }
    }

    render() {
        return (
            <Main {...this.props}>
                <Switch>
                    <Route exact path="/" component={DefaultPage} />

                    <Route exact path="/admin/tables" component={Tables} />
                    <Route exact path="/admin/tables/create" component={TablesCreate} />
                    <Route exact path="/admin/tables/:tableName/edit" component={TablesEdit} />
                    <Route exact path="/admin/tables/:tableName/edit/column/:columnName" component={TablesEditColumn} />
                    <Route exact path="/admin/tables/:tableName/edit/add-column" component={TablesAddColumn} />
                    <Route exact path="/admin/tables/:tableName" component={TablesView} />
                    <Route exact path="/admin/interface" component={Interface} />
                    <Route exact path="/admin/interface/create-page" component={CreatePage} />
                    <Route exact path="/admin/interface/page/:pageID-:pageName" component={EditPage} />
                    <Route exact path="/admin/interface/menu/:menuID-:menuName" component={EditMenu} />
                    <Route exact path="/admin/interface/block/:blockID-:blockName" component={EditBlock} />
                    <Route exact path="/admin/interface/create-menu" component={CreateMenu} />
                    <Route exact path="/admin/interface/create-block" component={CreateBlock} />
                    <Route exact path="/admin/contracts" component={Contracts} />
                    <Route exact path="/admin/contracts/create" component={CreateContract} />
                    <Route exact path="/admin/contracts/:contractID-:contractName" component={EditContract} />
                    <Route exact path="/admin/languages" component={Languages} />
                    <Route exact path="/admin/languages/create" component={CreateLanguage} />
                    <Route exact path="/admin/languages/:translationID-:translationName" component={EditLanguage} />
                    <Route exact path="/admin/parameters" component={Parameters} />
                    <Route exact path="/admin/parameters/create" component={ParametersCreate} />
                    <Route exact path="/admin/parameters/:parameterName" component={ParametersEdit} />

                    <Route exact path="/page/:pageName" component={Page} />

                    <Route exact path="/debug" component={Debug} />
                    <Route exact path="/backup" component={Backup} />
                    <Route path="*" component={NotFound} />
                </Switch>
            </Main>
        );
    }
}

const mapStateToProps = (state: IRootState) => ({
    session: state.auth.sessionToken,
    menus: state.content.menus,
    pending: state.content.pending,
    isCollapsed: state.engine.isCollapsed,
    transactionsCount: state.tx.transactions.count(),
    pendingTransactions: state.tx.transactions.takeLast(5)
});

const mapDispatchToProps = {
    setCollapsed,
    menuPop,
    menuPush,
    menuInit: menuInit.started
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);