import React, {Component} from "react";
import axios from "axios";

class SignIn extends Component {
  state = {
    username: "",
    password: ""
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const {username, password} = this.state;
    axios({
      method: 'POST',
      url: '/auth/signin',
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
      <div>
        <li><a href="/auth/google">Sign in with Google</a></li>
        <form onSubmit={this.handleSubmit}>
          <h1>Sign In</h1>
          <input type="text" name="username"  onChange={this.handleChange} />   
          <input type="text" name="password"  onChange={this.handleChange} />       
        
        <input type="submit" value="Submit" />
      </form>
      <li><a href="/register">Register?</a></li>
      </div>
      
    );
  }
}

export default SignIn;