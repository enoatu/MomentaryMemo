import "babel-polyfill"; //ないとasyncでエラー
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Master from './master';

class ErrorBoundary extends React.Component {
    state = { hasError: false }
    componetDidCatch(error, errorInfo) { console.log(error, errorInfo); }
    static getDerivedStateFromError(error) { return { hasError: true }; }
    render() {return (this.state.hasError ? <h1>拡張機能エラー</h1>: this.props.children);}
}

ReactDOM.render(
    <ErrorBoundary><Master /></ErrorBoundary>,
    document.querySelector('#root')
);
