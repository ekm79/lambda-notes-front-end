import React from 'react';
import Login from './Login';
import Register from './Register';

const Authenticate = props => 
    class extends React.Component {
        constructor() {
            super();
            this.state = {
                loggedIn: false
            }
        }

        componentDidMount() {
            if (localStorage.getItem('token')) {
                this.setState({loggedIn: true});         
            }
        }

        render() {
            if (this.state.loggedIn) {
                return null
            }
            else return <div><Login /><Register /></div>
        }
    }


export default Authenticate;