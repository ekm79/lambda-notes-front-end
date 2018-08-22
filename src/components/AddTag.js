import React from 'react';
import {addTags} from './../actions';
import {connect} from 'react-redux';

class AddTag extends React.Component {
    constructor() {
        super();
        this.state = {
            tag: '',
            tags: []
        }

    }

    handleTag = (event) => {
         this.setState({tag: event.target.value})
         console.log(this.state.tag);
    }

    addTag = () => {
        const tag = this.state.tag;
        const tags = this.state.tags;
        tags.push(tag);
        this.setState({tag:'', tags: tags})
        console.log(tags);
    }
    render() {
        return(
            <div>
            <form onSubmit={this.addTag()}>
                <input 
                    type='text'
                    name='tag'
                    placeholder='Tag'
                    onChange={this.handleTag}
                    />
                    <button onClick={this.addTag}>Add</button>
            </form>
            {this.state.tags > 0 ? this.state.tags.map(tag => {
                return <div>{tag.tag}</div> 
            }) : null}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      tags: state.notes.tags,
      update: state.toggle.update
    }
  }
  
  const mapActionsToProps = {
    addTags: addTags,
  }
  export default connect( mapStateToProps, mapActionsToProps)(AddTag);

//