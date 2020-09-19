import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// Gives the ability for certain components to call action creators
import  { connect } from 'react-redux';
// Assign all the action creators to the object actions
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import SignIn from './SignIn';
import Register from './Register';
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>


class App extends Component {

    // Runs on page load
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <div className="container">
               <BrowserRouter>
               <div>
                   <Header />
                   <Route exact path="/" component={Landing} />
                   <Route exact path="/surveys" component={Dashboard} />
                   <Route path="/surveys/new" component={SurveyNew} />
                   <Route exact path="/signin" component={SignIn} />
                   <Route exact path="/register" component={Register} />
                   
                  
               </div>
               </BrowserRouter>
            </div>
        );
    }
    
};
// Actions assigned to the App component as props
export default connect(null, actions) (App);