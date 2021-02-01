import React, { useRef, useState, useEffect } from 'react'

const List = ({printData}) => {
    //console.log("printData type==>",typeof(printData));
    console.log("printData type==>",printData);
    const [values, setValues] = useState([]);

    useEffect(()=>{
        setValues(printData());
    },[printData])

    return values.map((item, key)=>{
        return <div>{item}</div>
    })
};

export default List;
