import "babel-polyfill"; //ないとasyncでエラー
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { DisplayBox } from './CommonStyle';
import config from './config';

const Display = props => {
    const [r, setRed] = useState(255);
    const [g, setGreen] = useState(255);
    const [b, setBlue] = useState(255);
    const [last, setLast] = useState('');

    const getLocalStorage = val => {
        return new Promise((resolve) => {
            chrome.storage.local.get([val], (result) => resolve(result[val]));
        });
    }

    const displayData = () => {
        async function getJSON (val) {
            const items = await getLocalStorage('BTC');
            const json = items[items.length - 1];
            return json;
        }
        getJSON().then(result => setLast(
            result && result.data && result.data[0] && result.data[0].last || 'エラー'
        ));
    }

    setTimeout(() => displayData(), 100);
    setInterval(() => displayData(), setting.DISPLAY_INTERVAL);

    return (
        <DisplayBox bgColor={`rgb(${r},${g},${b})`} color='#000'>
            <span>{last}</span>
        </DisplayBox>
    );
}

class ErrorBoundary extends React.Component {
    state = { hasError: false }
    componetDidCatch(error, errorInfo) { console.log(error, errorInfo); }
    static getDerivedStateFromError(error) { return { hasError: true }; }
    render() {return (this.state.hasError ? <h1>拡張機能エラー</h1>: this.props.children);}
}

const mainRoot = document.createElement('div');
mainRoot.setAttribute('id', 'coin-trade-supporter-display-box');
document.body.appendChild(mainRoot);
ReactDOM.render(
    <ErrorBoundary><Display /></ErrorBoundary>,
    document.querySelector('#coin-trade-supporter-display-box')
);
