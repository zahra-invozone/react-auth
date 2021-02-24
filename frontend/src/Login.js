import React, {useState} from 'react';
import axios from 'axios';
import {setUserSession} from './Utils/Common';
import "./index.css";

function Login(props) {
    const [loading, setLoading] = useState(false);
    const email = useFormInput('');
    const password = useFormInput('');
    const [error, setError] = useState(null);

    // handle button click of login form
    const handleLogin = () => {
        setError(null);
        setLoading(true);
        axios.post('http://localhost:8080/api/auth/signin', {
            email: email.value,
            password: password.value
        }).then(response => {
            setLoading(false);
            setUserSession(response.data.token, response.data.user);
            props.history.push('/dashboard');
        }).catch(error => {
            setLoading(false);
            if (error.response.status === 401) setError(error.response.data.message);
            else setError(error.response.data.message);
        });
    }

    return (
        <div>
            <form>
                <h3>Login</h3>

                {error && <><small style={{color: 'red'}}>{error}</small><br/></>}<br/>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email"{...email} className="form-control" placeholder="Enter email" required=""/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" {...password} className="form-control" placeholder="Enter password"
                           required=""/>
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1"/>
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block" value={loading ? 'Loading...' : 'Login'}
                        onClick={handleLogin} disabled={loading}>Sign in
                </button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>


        </div>
    );
}

const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);

    const handleChange = e => {
        setValue(e.target.value);
    }
    return {
        value,
        onChange: handleChange
    }
}

export default Login;