import React, { useEffect, useState, useRef } from 'react'
export default () => {
    const [initialState, setInitialState] = useState(0);
    const [multiply, setMultiply] = useState(0);
    const [width, setWidth] = useState(100);
    const multiplyWtih = 2;
    const inputWidthData = useRef();
    const defaultWidth = 100;
    useEffect(() => {
        console.log('Mount only one time-->');
    }, []);

    useEffect(() => {
        console.log('Mount multiple times-->');
    });

    useEffect(() => {
        console.log('Doing update if state change-->');
        setMultiply(initialState * multiplyWtih)
    }, [initialState]);

    useEffect(() => {
        console.log('Unmount only once-->');
        return;
    }, []);

    useEffect(() => {
        console.log('Unmount after every update-->');
        return;
    });
    const changeInputWidth = (wi) => {
        let newWidth = defaultWidth + wi;
        inputWidthData.current.style.width = `${newWidth}px`;
        console.log(inputWidthData.current.target.value)
        setWidth(newWidth);
    }


    const doAction = () => {
        setInitialState(initialState + 1);
    }
    return (
        <div>
            <div>Counter is here {initialState}</div>
            <div>Multiplication {initialState}X{multiplyWtih}={multiply}</div>
            <input type='button' onClick={() => { doAction() }} value='Click On Me' />

            <h1>Use ref example</h1>

            <input ref={inputWidthData} value={width} onChange={(e)=>{setWidth(e.target.value)}} type='number' style={{'width':`${width}px`}} value={width} />
        </div>
    )
}