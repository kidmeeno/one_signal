import React, {component, useState} from 'react';

const Login = () => {
    const[email, setEmail] = useState('')
    const[id, setId] = useState('')

    return(
        <div>
            <form style={{ border: '2px solid #4d4d33', margin:'5% 15%', backgroundColor:'#c2c2a3', height:'10vh', padding:'3%'}}>
                <div className="form-group">
                    <label>Email</label>
                    <input style={{padding: '1%'}} type="text" id="email" value="Email" required ></input> <br /> 
                </div>

            </form>
        </div>
    )
}
export default Login;
