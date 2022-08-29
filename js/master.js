import React, { useState, useEffect } from 'react';
import "babel-polyfill"; //ないとasyncでエラー
import styled, { css } from 'styled-components';
import { InputExample } from './InputExample';

const noScroll = event => {
    event.preventDefault();
}

const refs = {
    outBox: null,
    textarea: null,
};

const Master = () => {
    const [memo, setMemo] = useState(['']);
    const getLocalStorage = async val => {
        return new Promise((resolve) => {
            chrome.storage.local.get(val, (result) => resolve(result[val]));
        });
    }

    useEffect(() => {
        getLocalStorage('memo').then(result => setMemo(result));
    }, []);

    const handleKeyDown = event => {
        if (event.key === "Tab") {
            event.preventDefault();
            onChangeText(event);
        }
    }

    const onChangeText = e => {
        let value = e.target.value;
        if (e.key === 'Tab') {
            value += "\t";
        }
        chrome.storage.local.set({'memo': value});
        setMemo(value);
    }

    const syncScroll = () => {
        // before(左)とafter(右)を変数に入れる
        const before = refs.textarea;
        const after = refs.outBox;

        // beforeとafterそれぞれの高さの現在値を取得
        const beforeScr = before.scrollTop;
        const afterScr = after.scrollTop;

        // afterの高さを取得
        const afterHeight = after.scrollHeight;

        // 全体の高さから現在値の高さをひいて、高さの割合をだす
        const beforeHeight = before.scrollHeight - beforeScr;
        const scrPercent = beforeScr / beforeHeight;

        // beforeのスクロールの割合をafterにかけて、その分だけafterをスクロールさせる
        after.scrollTo(0, afterHeight * scrPercent);
    }

    const renderInfo = () => {
        const lines = String(memo).split(/\r\n|\r|\n/);
        return lines.map((item, index) => {
            //const slash_yyyymmdd = /([12]\d{3}\/(*0[1-9]|1[0-2])\/(0*[1-9]|[12]\d|3[01]))/;
            //const hyphen_yyyymmdd = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
            //const slash_ddmmyyyy = /([12]\d{3}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01]))/;
            //const hyphen_ddmmyyyy = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
            //const hyphen_ddmmyyyy = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
            const re = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]/;
            //if (item.match(/slash_yyyymmdd/|hyphen_yyyymmdd/) {
            const hourReg = /([0-9]|2[0-3]|[01][0-9])時/;
            return (
                <React.Fragment key={index}>
                    <span css={css`
                        ${styles.memoText}
                        background-color: #FF9800;
                        color: red;
                        width: 100%;
                        padding-right: ${item.match(re) || item.match(hourReg) ? '2px' : '0'};
                    `}>{item.match(re) || item.match(hourReg) ? 'set' : ''}</span>
                    <br/>
                </React.Fragment>
            );
        });
    }

    return (
        <Container>
            <InputExample/>
            <div css={css`
                display: flex;
            `}>
                <div
                    ref={comp => {
                        if (!comp || refs.outBox) return;
                        refs.outBox = comp;
                        refs.outBox.addEventListener('keydown', syncScroll, false);
                        refs.outBox.addEventListener('mousewheel', noScroll, {passive: false});
                        refs.outBox.addEventListener('touchmove', noScroll, {passive: false});
                    }}
                    css={css`
                        height: 500px;
                        width: 20%;
                        padding-top: ${2 + 1}px;
                        text-align: right;
                        overflow:hidden;
                `}>
                    {renderInfo()}
                </div>
                <textarea
                    ref={comp => {
                        if (!comp || refs.textarea) return;
                        refs.textarea = comp;
                        refs.textarea.addEventListener('scroll', syncScroll, false);
                        refs.textarea.addEventListener('keydown', handleKeyDown, false);
                    }}
                    css={css`
                        ${styles.memoText}
                        height: 500px;
                        width: 80%;
                        padding-top: 2px;
                        outline: none;
                    `}
                    value={memo}
                    onChange={onChangeText}
                />
            </div>
        </Container>
    )
}
const Mixin = {
    text: () => `
        font-family: 'ヒラギノ角ゴ Pro W3','Hiragino Kaku Gothic Pro','メイリオ','Meiryo','ＭＳ Ｐゴシック','sans-serif';
    `,
};
const styles = {
    memoText: css`
        ${Mixin.text}
        line-height: 1.5;
        font-size: 14px;
    `,
    commonPadding: css`
    `,
};

const Container = styled.div`
    padding: 10px;
    width: 500px;
    background-color: #235180;
`;

export default Master;
