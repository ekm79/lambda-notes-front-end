import React from 'react';
import Styled from 'styled-components'
import {Heading, Button} from './../styles/styles';
import { Link, withRouter } from 'react-router-dom';
import Login from './../components/Auth/Login';
import {logoutUser} from './../actions';
import Register from './../components/Auth/Register';
import { connect } from 'react-redux';


const Content = Styled.div`
  background: #D8D8D8;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 290px;
  height: 100vh;
  padding: 5px;
`;


class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      loops: 0
    }
  }

  logOut = () => {
    localStorage.removeItem('token'); 
    //this.setState({loggedIn: false});
    this.props.history.push('/')
  }

  componentDidMount() {
    if (localStorage.getItem('token')) {
        this.setState({loggedIn: true});   
        this.props.history.push("/notes");
            
    }
    console.log(this.state);
}

shouldComponentUpdate(nextProps, nextState) {
  if (this.props.loggedIn !== nextProps.loggedIn) {
    console.log(this.props.loggedIn)
    return true;     
}
console.log(this.state.loggedIn)
return false;
}

componentDidUpdate(prevProps, prevState) {
  if(this.state.loops > 3){
  if (localStorage.getItem('token')) {
    console.log(this.props.loggedIn);
      this.setState({loggedIn: true});   
      this.setState({loops: this.state.loops + 1})      
  }
}
}

  render() {
    return(
      <Content>
        <Heading main>Lambda Notes</Heading>
        {this.props.loggedIn===true ? 
        <div>
        <Link to='/notes'><Button> View Your Notes</Button></Link>
        <Link to='/new'><Button>Create New Note</Button></Link> 
        <Button onClick={this.logOut}>Log out</Button>
        </div>
        : 
        <div>
        <Login history={this.props.history}/> <Register history={this.props.history}/> 
        </div>}    
        </Content>
    )
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.users.loggedIn,
    users: state.users
  }
}

const mapActionsToProps = {
  logout: logoutUser
}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Sidebar));
