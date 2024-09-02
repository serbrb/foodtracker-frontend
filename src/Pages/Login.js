import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

export const Login = () => {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Email:', email);
    console.log('Password:', password);
    axios({
        url: "http://localhost:8001/api/v1/user/login",
        method: "POST",
        headers: {'Content-Type': 'application/json',Authorization: 'Bearer '+localStorage.getItem('token'),},
        data: JSON.stringify({
            "userName": email,
            "password": password
        })
      }).then(resp => {
        console.log(resp)
        if(resp.status===200){
            let data = resp.data;
            localStorage.setItem("userId", data.id);
            localStorage.setItem("firstName", data.firstName);
            localStorage.setItem("lastName", data.lastName);
            window.location.replace("/dashboard");
        } else {
            toast.error("Invalid credentials");
        }

      }).catch(e => {
        console.error(e);
        if(e && e.response && e.response.data && e.response.data.message){
            toast.error(e.response.data.message);
        }
      })
  };
  const styles = {
    container: {
      maxWidth: '400px',
      margin: '100px auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '20px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      backgroundColor: '#f9f9f9',
    },
    title: {
      textAlign: 'center',
      marginBottom: '20px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    inputGroup: {
      marginBottom: '15px',
    },
    label: {
      marginBottom: '5px',
      fontWeight: 'bold',
    },
    input: {
      width: '100%',
      padding: '10px',
      fontSize: '16px',
      borderRadius: '4px',
      border: '1px solid #ccc',
    },
    button: {
      padding: '10px',
      fontSize: '16px',
      color: '#fff',
      backgroundColor: '#262673',
      border: 'none',
      borderRadius: '20px',
      cursor: 'pointer',
      marginTop: '10px',
    },
  };
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.button}>
          SIGN IN
        </button>
        <p>Dont have an account? <a href='/register'>Sign up</a></p>
      </form>
    </div>
  )
}
