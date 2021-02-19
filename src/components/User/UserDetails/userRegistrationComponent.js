import React,{useEffect, useState} from 'react'

const RegisterUser = () => {

    const [userInput, setUserInput] = useState({});
    const handleChange = (event) => {
        let data = userInput;
        data[event.target.name] = event.target.value;
        setUserInput(data);
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log(userInput);
    }


    return (
        <div>
            <form onSubmit={(event)=>{handleFormSubmit(event)}}>
                <div>
                    Username: <input onChange={(event)=>{handleChange(event)}} type="text" name="username" />
                </div>
                <div>
                    Password: <input onChange={(event)=>{handleChange(event)}} type="password" name="password" />
                </div>
                <div>
                    <input type="submit" value="Register" />
                </div>
            </form>
        </div>
    )
}

export default RegisterUser