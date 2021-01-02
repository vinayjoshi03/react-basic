

export const validateLoginForm = (data) =>{
    let keys = Object.keys(data);
    let errorMessage = {};
    keys.map((value, index) =>{
        switch(value){
            case "username":
                if(data[value] === "") {
                    errorMessage['username']="Username is required field";
                }
                break; 
            case 'password':
                if(data[value] === "") {
                    errorMessage['password']="Password is required field";
                }
                break;

            default:
                errorMessage['username']="Username is required field";
                errorMessage['password']="Password is required field";

        }
        return errorMessage;
    });
    if(Object.keys(errorMessage).length>=0) {return errorMessage; } else {return true;}
}