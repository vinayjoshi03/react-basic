import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import List from './List'
const TestComponent = () => {


    // Use state with use ref hook example
    let [changeStae, setChangeState] = useState('');
    const prevCount = usePrevious(changeStae);

    function usePrevious(value) {
        const ref = useRef();
        console.log('Ref data==>', ref);
        useEffect(() => {
            
            ref.current = value;
        });
        return ref.current;
    }


    const [listNumber, setListNumber] = useState(0);

    const listData = useCallback(function() {
        return [listNumber, listNumber+1, listNumber+2];
    },[listNumber])

    function secondMax() {
        var arr = [20, 120, 111, 215, 54, 78]; // use int arrays
        var max = Math.max.apply(null, arr); // get the max of the array
        // console.log(max);
        arr.splice(arr.indexOf(max), 1); // remove max from the array
        return Math.max.apply(null, arr); // get the 2nd max
    };

    function getAverageSalary() {
        let a = {name:"vinay", address:{city:"Pune"}};

        let b = {...a}
        b.address.city="Pune";
        console.log("b===>", b.address.city);
        console.log("b===>", a.address.city);
        const inputObj = [
            {
                city: "Pune",
                salary: 200
            },
            {
                city: "Mumbai",
                salary: 150
            },
            {
                city: "Pune",
                salary: 100
            }, {
                city: "Pune",
                salary: 200
            },
        ]

        let cityObject = [];
        let value = [];
        let cityCount = 1;
        for (var i = 0; i < inputObj.length; i++) {
            //console.log("city-->",cityObject.includes(inputObj[i].city));

            if (!cityObject.some(el => el.city === inputObj[i].city)) {

                cityObject[i] = { city: inputObj[i].city, salary: inputObj[i].salary }
            } else {
                cityCount++;
                let index = findWithAttr(cityObject, 'city', inputObj[i].city);
                let salary = cityObject[index].salary;
                console.log("Existing salary-->", salary, 'new salary-->', salary + inputObj[i].salary, 'count-->', cityCount);
                cityObject[index].salary = (salary + inputObj[i].salary) / cityCount;
            }
        }
        console.log(cityObject);

    }
    function findWithAttr(array, attr, value) {
        for (var i = 0; i < array.length; i += 1) {
            if (array[i][attr] === value) {
                return i;
            }
        }
        return -1;
    }




    function sortArray() {
        var input = [2, 3, 8, 1, 20, 5, 9, 60, 6];

        var output = [];
        var inserted;

        for (var i = 0, ii = input.length; i < ii; i++) {
            inserted = false;
            for (var j = 0, jj = output.length; j < jj; j++) {
                if (input[i] < output[j]) {
                    inserted = true;
                    output.splice(j, 0, input[i]);
                    break;
                }
            }
            if (!inserted)
                output.push(input[i])
        }
        return output;
    }

    useEffect(() => {
        //setChangeState("Component did update");
        console.log("Update-->", changeStae);
        console.log('Component did update');
    }, [changeStae]);

    useEffect(() => {
        // setChangeState("componentWillUnmount");
        return;
    });
    

    function handleChangeEvent(event) {
        console.log(event.target.value);
        setChangeState(event.target.value);
    }


    //Fibonaceae series
    function fibonaceae() {
        var number = 10;
        var n1 = 0;
        var n2 = 1;
        var next = 0;
        for (var i = 1; i <= number; i++) {
            console.log(n1);
            next = n1 + n2;
            n1 = n2;
            n2 = next;
        }
    }

    var ref = React.createRef();

    useEffect(function() {
        console.log(ref);
        if(ref !=undefined) {
            console.log("Ref value==>",ref.value);
        }
    },[]);
    const [apiData, setApiData] = useState([]);
  const fetchData = async () => {
    await fetch("https://jsonplaceholder.typicode.com/todos")
      .then(data => {
        return data.json();
      })
      .then(apiResp => {
        setApiData(apiResp);
      });
  };
  useEffect(function() {
    fetchData();
  }, []);
  const printData = () => {
    const data = apiData.map((item, key) => {
      const randomno = Math.random();
      return (
        <tr id={key+randomno}>
          <td style={{border: "1px solid red"}} >{item.id}</td>
          <td style={{border: "1px solid red"}} >{item.title}</td>
        </tr>
      );
    });
    return <table>
    <thead>
      <th>Userid</th>
      <th>Title</th>
    </thead>
    <tbody>
    {data}
    </tbody>
    </table>;
  };
    return (

        <div>
            {changeStae} Previous Value = {prevCount}
            <input type="text" name="changeValue" onChange={(event)=>handleChangeEvent(event)} />
            {secondMax()}
            Sorted: {sortArray()}

            <div>Average: {getAverageSalary()}</div>
            <div>fibonaceae: {fibonaceae()}</div>
            <div>useCallback Type Number: <input type="text" onChange={(event)=>setListNumber(parseInt(event.target.value))}/></div>
            <div><List printData={listData} /></div>

            <div>
                Use Ref example
            <input type="text" ref={ref}/>
            </div>
            <div>
                Fetch function 
                {printData()}
            </div>
        </div>
    )
}

export default TestComponent;

