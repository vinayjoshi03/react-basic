

export const validateLoginForm = (data) =>{
    let keys = Object.keys(data);
    let errorMessage = {};
    errorMessage = [];
    keys.map((value, index) =>{
        console.log("Values==>", value);
        switch(value){
            case "username":
                if(data[value] === "") {
                    console.log("Username empty");
                    errorMessage['username']="Username is required field";
                }
                break; 
            case 'password':
                if(data[value] === "") {
                    console.log("password empty");
                    errorMessage['password']="Password is required field";
                }
                break;

            default:
                console.log("both  empty");
                errorMessage['username']="Username is required field";
                errorMessage['password']="Password is required field";

        }
        return errorMessage;
    });
    if(Object.keys(errorMessage).length>0) {console.log("returning errors"); return errorMessage; } else {console.log("returning success"); return true;}
}