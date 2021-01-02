import React,{useState, useContext, useEffect} from 'react'

function ReactHooks(props){
    
//    console.log(state.name);
    //const theme = useContext(ThemeContext);

    useEffect(() => {
        // Update the document title using the browser API
        document.title = `You clicked ${data} times`;
      });

    const [data, setData] = useState('Mount');
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