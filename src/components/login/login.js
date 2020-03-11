import React, {component, useState} from 'react';

const Login = () => {
    const[username, password] = useState(0)
    return(
        <div>
            <form>
                <label>username</label>
                <input type="text" id="username"></input> <br /> 
                <label>Password</label>
                <input type="password" id="password"></input>
            </form>
        </div>
    )
}
export default Login;