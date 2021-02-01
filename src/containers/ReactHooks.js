import React,{useState, useContext, useEffect} from 'react'

function ReactHooks(props){
    
    //const theme = useContext(ThemeContext);

    useEffect(() => {
        // Update the document title using the browser API
        document.title = `You clicked ${data} times`;
        console.log("componentDidMount==>");
    });

    

    

    const [data, setData] = useState('Mount');
    useEffect(() => {
        // Update the document title using the browser API
        document.title = `Data is updated`;
        //console.log("Mount cal==>");
        console.log("componentDidUpdate==>");
    },[data]);

    useEffect(() => {
        // Update the document title using the browser API
        document.title = `Unmount happen`;
        console.log("componentWillUnmount==>");
        return;
    },[]);
    const updatedData = () => {
        setData("Update")
    }

    return (
    <div>
        <div>{data}</div>
        <div><button onClick={updatedData}>Change State</button></div>
    </div>
    )
}

export default ReactHooks