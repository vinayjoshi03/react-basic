import React, { useCallback, useState } from 'react'
import TitleComponent from './../components/UseCallback/TitleComponent'
import CountComponent from './../components/UseCallback/CountComponent'
import ButtonComponent from './../components/UseCallback/ButtonComponent'

const UseCallbackHooComponent = () => {
    const [salary, setSalary] = useState(1000);
    const incrementSalary = useCallback(() => {
        setSalary(salary+1000);
    }, [salary]);

    const [age, setAge] = useState(10);
    const incrementAge = useCallback(() => {
        setAge(age+10);
    }, [age])
    return (
        <div>
            <TitleComponent />
            <CountComponent text="Salary" count={salary}/>
            <ButtonComponent handleClick={incrementSalary}>Incremet Salary</ButtonComponent>

            <CountComponent text="Age" count={age}/>
            <ButtonComponent handleClick={incrementAge}>Incremet Age</ButtonComponent>
        </div>
    )
}

export default React.memo(UseCallbackHooComponent);