import React from 'react'

const CountComponent = ({ text, count }) => {
    console.log("Rendering count -- ", text);
    return (
        <div>{text} - {count}</div>
    )
}

export default React.memo(CountComponent);