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

declare module 'genesis/editor' {
    import { TProtypoElement } from 'genesis/protypo';

    type TConstructorData = {
        jsonData: TProtypoElement[],
        treeData?: TConstructorTreeElement[],
        pageTemplate?: string,
        selectedTag?: TProtypoElement
    };

    type TConstructorTreeElement = {
        title: string,
        children?: TConstructorTreeElement[],
        expanded?: boolean,
        id?: string,
        selected: boolean,
        logic: boolean,
        canMove: boolean,
        canDrop: boolean,
        tag?: TProtypoElement
    };

    type TEditorTab = {
        readonly type: string;
        readonly id: string;
        readonly new: boolean;
        readonly name: string;
        readonly tool: string;
        readonly value: string;
        readonly initialValue: string;
        readonly preview?: TProtypoElement[];
        readonly designer?: {
            data: TConstructorData,
            history?: {
                data: TProtypoElement[][],
                position?: number,
                canUndo?: boolean,
                canRedo?: boolean
            };
        };
        readonly dirty: boolean;
        readonly appId?: number;
    };

    interface IEditorTabCreateCall {
        id: string;
        name: string;
        value: string
    }

    interface ICreateEditorTabCall{
        type: string;
        appId: number;
    }

    interface ILoadEditorTabCall {
        type: string;
        name: string;
    }

    interface IReloadEditorTabCall {
        type: string;
        id: string;
        data: Partial<TEditorTab>;
    }

    interface IChangePageCall {
        text?: string;
        attrName?: string;
        attrValue?: string;
        canDropPosition?: string;
        tagID: string;
        pageID?: string;
    }

    interface IChangePageResult {
        jsonData: TProtypoElement[];
        treeData: TConstructorTreeElement[];
        selectedTag?: TProtypoElement;
    }

    interface IGetPageTreeResult {
        name?: string;
        jsonData: TProtypoElement[];
        treeData?: TConstructorTreeElement[];
        error?: string;
    }

    interface IAddTagCall {
        tag: ISourceElement;
        destinationTagID?: string;
        position?: string;
    }

    interface IOperateTagCall {
        tag: TProtypoElement;
        destinationTagID?: string;
        position?: string;
    }

    interface IOperateTagResult {
        jsonData: TProtypoElement[];
        treeData: TConstructorTreeElement[];
    }

    interface IMoveTreeTag {
        treeData: TConstructorTreeElement[];
        tagID: string;
    }

    interface ISaveConstructorHistoryResult {
        data: TProtypoElement[][];
        position: number;
        canUndo: boolean;
        canRedo: boolean;
    }

    interface IConstructorUndoRedoResult {
        position: number;
        canUndo: boolean;
        canRedo: boolean;
        jsonData: TProtypoElement[];
        treeData: TConstructorTreeElement[];
    }

    interface ISetTagCanDropPositionCall {
        tagID: string;
        position: string;
    }

    interface ISetTagCanDropPositionResult {
        jsonData: TProtypoElement[];
        treeData: TConstructorTreeElement[];
    }

    interface ISelectTagResult {
        selectedTag: TProtypoElement;
        treeData: TConstructorTreeElement[];
    }

    interface ISourceElement {
        new: boolean;
        element: string;
        template?: string;
        text?: string;
    }

    interface IConstructorElementProps {
        editable?: boolean;
        selected?: boolean;
        logic?: boolean;
        changePage?: (attrs: IChangePageCall) => void;
        setTagCanDropPosition?: (attrs: ISetTagCanDropPositionCall) => void;
        addTag?: (attrs: IAddTagCall) => void;
        copyTag?: (attrs: IOperateTagCall) => void;
        moveTag?: (attrs: IOperateTagCall) => void;
        removeTag?: (attrs: IOperateTagCall) => void;
        selectTag?: (attrs: TProtypoElement) => void;
        selectedTag?: TProtypoElement;
        tag?: TProtypoElement;
        canDropPosition?: string;
        isOver?: boolean;
        isDragging?: boolean;

        connectDropTarget?: any;
        connectDragSource?: any;
        connectDragPreview?: any;
    }

    interface IFindTagResult {
        el: TProtypoElement | null;
        parent: TProtypoElement | null,
        parentPosition: number,
        tail: boolean
    }
}