import FormComment from './FormComment'
import ListComment from './ListComment'
import './comment.css'

const React = require('react')

const axios = require('axios')

class DrupalComments extends React.Component {
  constructor(props) {
        super(props)

        // Bind the this context to the handler function
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this);

        // Set some state
        this.state = {
            refresh: false
        };
    }
    
  //get props data
  getProps() {
    const keys = Object.keys(this.props);
    const props = keys.reduce((props, key) => {
      props[`data-${key.toLowerCase()}`] = this.props[key];
      return props;
    }, {});
    return props;
  }

  handleCommentSubmit() {
    this.setState({refresh: true})
  }

  render() {
    const params = this.getProps();
    return (
      <div className="block-drupal-comments">
        <h2>Comments</h2>
        <FormComment params={params} onCommentSubmit={this.handleCommentSubmit} ></FormComment>
        <ListComment params={params} refresh={this.state.refresh} ></ListComment>
      </div> 
    )
  }
}


export default DrupalComments
