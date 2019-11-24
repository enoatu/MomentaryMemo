import "babel-polyfill"; //ないとasyncでエラー
import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';

export const InputExample = props => {
    const date = new Date();
    const [isOpen, open] = useState(false);
    //#FF9800 #235180 #B6B6B6
    const year  = date.getFullYear();
    const month = date.getMonth() + 1;
    const day   = date.getDate();
    return (
        <div css={css`
            margin: 10px 0 10px 0;
            background-color: #FF9800;
        `}>
            <div css={css`
                display: flex;
                justify-content: space-around;
            `}>
                <span>special description example</span>
                <div css={isOpen ? styles.topTriangle : styles.bottomTriangle} onClick={() => open(!isOpen)}></div>
            </div>
            <div css={css`
                background-color: #B6B6B6;
                transition: all 0.3s ease-out;
                height: ${isOpen ? '100px' : '0'};
                overflow: hidden;
                padding-top: ${isOpen ? '5px' : '0'};
                padding-left: 5px;
            `}>
                <Table isOpen={isOpen}>
                    <tbody>
                        <tr>
                            <td>09:30</td>
                            <td> => alerm at {'' + year + '/' + month + '/' + day} 09:00</td>
                        </tr>
                        <tr>
                            <td>12/10 09:30</td>
                            <td> => alerm at {year}/12/10 09:00</td>
                        </tr>
                        <tr>
                           <td>{year}/12/10 09:30</td>
                           <td> => alerm at {year}/12/10 09:00</td>
                        </tr>
                        <tr>
                            <td>9時</td>
                            <td> => alerm at {'' + year + '/' + month + '/' + day} 08:30</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

const Table = styled.table`
    tbody > tr > td {
        padding-right:5px;
        padding-bottom: 5px;
    }
`;
const styles = {
    topTriangle: css`
        cursor: pointer;
        width: 0px;
        height: 0px;
        margin-top: 3px;
        border-right: 10px solid transparent;
        border-bottom: 10px solid #b2ce54;
        border-left: 10px solid transparent;
    `,
    bottomTriangle: css`
        cursor: pointer;
        width: 0px;
        height: 0px;
        margin-top: 5px;
        border-right: 10px solid transparent;
        border-top: 10px solid #b2ce54;
        border-left: 10px solid transparent;
    `,
};
