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
import { IRootState } from 'modules';
import { setCollapsed } from 'modules/engine/actions';

import Sidebar from 'components/Main/Sidebar';

interface ISidebarContainerProps {

}

interface ISidebarContainerState {
    isEcosystemOwner: boolean;
    collapsed: boolean;
    navigationWidth: number;
}

interface ISidebarContainerDispatch {
    setCollapsed: typeof setCollapsed;
}

const SidebarContainer: React.SFC<ISidebarContainerProps & ISidebarContainerState & ISidebarContainerDispatch> = (props) => (
    <Sidebar {...props} />
);

const mapStateToProps = (state: IRootState) => ({
    collapsed: state.engine.isCollapsed,
    isEcosystemOwner: state.auth.isNodeOwner,
    navigationWidth: state.content.navigationWidth
});

const mapDispatchToProps = {
    setCollapsed
};

export default connect<ISidebarContainerState, ISidebarContainerDispatch, ISidebarContainerProps>(mapStateToProps, mapDispatchToProps)(SidebarContainer);