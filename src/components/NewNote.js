import React from 'react';
import {Heading, Button} from './../styles/styles';
import Styled from 'styled-components';
import { createNote, toggleUpdate } from './../actions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import AddTag from './AddTag';


const NewContainer = Styled.div`
  display: block;
  width: 100%;
  padding: 50px 25px;
  background: #F3F3F3;
  
`;

const FormContainer = Styled.div`
display: flex;
  flex-direction: column;
  justify-content: space-between;
    height: 500px;
  margin-top: 20px;
`;

const InputTitle = Styled.input`
    width: 400px;
    height: 50px;
    border-radius: 5px;
`;

const InputContent = Styled.textarea`
    width: 95%;
    height: 320px;
    border-radius: 5px;
`;



class NewNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            showForm: false,
            showTagForm: false,
            tag: '',
            newNote: {
                title: "",
                textBody: "",
                tags: [],
            }   
        }
    }

    handleChange = (newNote, event) => {
        this.setState({[newNote]: {...this.state[newNote], [event.target.name]: event.target.value}})
        console.log(this.state.newNote)
    }

    handleItem = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    submitNote = () => {
       this.props.createNote(this.state.newNote);
       console.log(this.state.newNote);
      this.setState({newNote: {title: "", textBody: ""}})
      this.props.toggleUpdate();
      console.log()
    }

    toggleTag = () => {
        this.setState({showTagForm: !this.state.showTagForm})
    }

    addItem = (newNote) => {
        let newTags = this.state.newNote.tags.push(this.state.tag)
         this.setState(state => ({tags: [...this.state.newNote, newTags]}))
     }

     componentDidMount() {
         
     }


    render() {
        return (
       
                <NewContainer>
                <Heading>Create New Note:</Heading>
                <FormContainer>
                    <InputTitle 
                        type="text"
                        name="title"
                        placeholder="Note Title"
                        value={this.state.newNote.title}
                        onChange={this.handleChange.bind(this, 'newNote')}
                        />
                    <InputContent 
                        
                        name="textBody"
                        rows="20"
                        cols="50"
                        placeholder="Note Content"
                        value={this.state.newNote.textBody}
                        onChange={this.handleChange.bind(this, 'newNote')}
                        />
                        <div>
                        <button onClick={this.toggleTag}>Add tag</button>
                        </div>
                        
                        {this.state.showTagForm ? 
                            <div >
                                <AddTag/>
                            </div>
                        : null}

                    <Button onClick={this.submitNote}>Save</Button>
                    </FormContainer>
                    {this.props.update ? <Redirect to={ `/notes`} /> : null}
            </NewContainer>
 
        )
    }
}

const mapStateToProps = state => {
    return {
      notes: state.notes.notes,
      update: state.toggle.update
    }
  }
  
  const mapActionsToProps = {
    createNote: createNote,
    toggleUpdate: toggleUpdate,
  }
  export default connect( mapStateToProps, mapActionsToProps)(NewNote);

  /*<input 
                                    type='text'
                                    name='tag'
                                    placeholder='Tag'
                                    onChange={this.handleItem}
                                />
                                <button onClick={this.addTag}>Add</button>*/