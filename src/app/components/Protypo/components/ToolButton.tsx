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
import propTypes from 'prop-types';

import Protypo from '../Protypo';

export interface IToolButtonProps {
    title?: string;
    icon?: string;
    page?: string;
    pageparams?: {
        [name: string]: string;
    };
    onClick: (e: any) => void;
}

interface IToolButtonContext {
    protypo: Protypo;
}

const ToolButton: React.SFC<IToolButtonProps> = (props, context: IToolButtonContext) => {
    return (
        <a href="#" className="ml btn-tool" onClick={props.onClick}>
            <em className={`icon ${props.icon}`} />
            <span>
                <span>{props.title}</span>
            </span>
        </a>
    );
};

ToolButton.contextTypes = {
    protypo: propTypes.object.isRequired
};

export default ToolButton;