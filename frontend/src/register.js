import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from './Utils/Common';

function Register(props) {
    const [loading, setLoading] = useState(false);
    const lastname = useFormInput('');
    const firstname = useFormInput('');
    const email = useFormInput('');
    const password = useFormInput('');
    const [error, setError] = useState(null);

    // handle button click of Register form
    const handleRegister = () => {
        setError(null);
        setLoading(true);
        axios.post('http://localhost:8080/api/auth/signup', { firstName:firstname.value,lastname:lastname.value,email: email.value, password: password.value }).then(response => {
            setLoading(false);
            setUserSession(response.data.token, response.data.user);
            // props.history.push('/dashboard');
            setError(response.data.message);
        }).catch(error => {
            setLoading(false);
            if (error.response.status === 401) setError(error.response.data.message);
            else setError(error.response.data.message);
        });
    }

    return (
        <div>
            <form>
                <h3>Register</h3>
                {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" {...firstname} placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" {...lastname} placeholder="Last name" />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" {...email} placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control"  {...password} placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block"  value={loading ? 'Loading...' : 'Register'} onClick={handleRegister} disabled={loading}>Register</button>
                <p className="forgot-password text-right">
                    Already registered <a href="login">log in?</a>
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

export default Register;