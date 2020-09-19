import React, {Component} from "react";
import axios from "axios";

class Register extends Component {
    state = {
        username: "",
        password: ""
      }
      handleSubmit = (e) => {
        e.preventDefault();
        const {username, password} = this.state;
        axios({
          method: 'POST',
          url: '/auth/register',
          data: {
            username,
            password
          },
          withCredentials: true
        })
        .then((res) => console.log(res));
      };
      handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({
          [name]: value 
        }
        
          
        );
      };
    
      
      render() {
        return (
          <form onSubmit={this.handleSubmit}>
              <h1>Register</h1>
              <input type="text" name="username"  onChange={this.handleChange} />   
              <input type="text" name="password"  onChange={this.handleChange} />       
            
            <input type="submit" value="Submit" />
          </form>
        );
      }
}

export default Register;