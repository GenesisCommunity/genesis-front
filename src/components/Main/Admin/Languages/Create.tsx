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
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import DocumentTitle from 'components/DocumentTitle';
import LocaleEditor from './LocaleEditor';

interface ICreateState {
    translations: {
        name: string;
        value: string;
    }[];
}

class Create extends React.Component<{}, ICreateState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            translations: [{
                name: '',
                value: ''
            }]
        };
    }

    mapContractParams(values: { [key: string]: any }) {
        const localizations = {};
        this.state.translations.forEach(l => {
            localizations[l.name] = l.value;
        });
        return {
            Name: values.name,
            Trans: JSON.stringify(localizations)
        };
    }

    onExec(block: string, error: string) {
        // TODO: Notification stub
        if (block) {
            alert('Success:: ' + block);
        }
        else if (error) {
            alert('Error:: ' + error);
        }
    }

    onNewLocale() {
        this.setState({
            translations: [
                ...this.state.translations,
                {
                    name: '',
                    value: ''
                }
            ]
        });
    }

    onDropLocale(index: number) {
        if (1 >= this.state.translations.length) {
            return;
        }

        this.setState({
            translations: [
                ...this.state.translations.slice(0, index),
                ...this.state.translations.slice(index + 1)
            ]
        });
    }

    onTranslationUpdate(index: number, property: string, value: any) {
        const translation = this.state.translations[index];
        if (translation) {
            this.setState({
                translations: [
                    ...this.state.translations.slice(0, index),
                    {
                        ...translation,
                        [property]: value

                    },
                    ...this.state.translations.slice(index + 1)
                ]
            });
        }
        else {
            // TODO: Impossible happened
        }
    }

    resolveTranslationValue(index: number, property: string) {
        const translation = this.state.translations[index];
        if (translation) {
            return translation[property];
        }
        else {
            return null;
        }
    }

    render() {
        return (
            <DocumentTitle title="admin.languages.create" defaultTitle="Create localization">
                <div className="content-wrapper">
                    <div className="content-heading">
                        <FormattedMessage id="admin.languages" defaultMessage="Language resources" />
                    </div>
                    <ol className="breadcrumb">
                        <li>
                            <Link to="/admin/languages">
                                <FormattedMessage id="admin.languages" defaultMessage="Language resources" />
                            </Link>
                        </li>
                        <li>
                            <FormattedMessage id="admin.languages.create" defaultMessage="Create localization" />
                        </li>
                    </ol>
                    <LocaleEditor
                        contractName="@1NewLang"
                        translations={this.state.translations}
                        onNewLocale={this.onNewLocale.bind(this)}
                        onDropLocale={this.onDropLocale.bind(this)}
                        onTranslationUpdate={this.onTranslationUpdate.bind(this)}
                        resolveTranslationValue={this.resolveTranslationValue.bind(this)}
                        mapContractParams={this.mapContractParams.bind(this)}
                        onExec={this.onExec.bind(this)}
                    />
                </div>
            </DocumentTitle>
        );
    }
}

export default Create;