// MIT License
// 
// Copyright (c) 2016-2018 GenesisKernel
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import React from 'react';

import themed from 'components/Theme/themed';

export interface IToolbarButton {
    icon: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface IToolbarProps {
    className?: string;
}

const Toolbar: React.SFC<IToolbarProps> = props => (
    <ul className={props.className}>
        {props.children}
    </ul>
);

const StyledToolbar = themed(Toolbar) `
    background: ${props => props.theme.toolbarBackground};
    border-bottom: solid 2px ${props => props.theme.toolbarOutline};
    height: 40px;
    list-style-type: none;
    margin: 0;
    padding: 0;
    font-size: 0;
`;

export default StyledToolbar;