import {IntlProvider, FormattedDate} from 'react-intl'
import FormComment from './FormComment'

const React = require('react')

const axios = require('axios')

class Comment extends React.Component {

  constructor(props) {
        super(props)

        // Bind the this context to the handler function
        this.handleCommentSubmit = this.handleCommentSubmit.bind(this)
        this.onHideChild = this.onHideChild.bind(this)
        this.onAddChild = this.onAddChild.bind(this)


        // Set some state
        this.state = {
            parent: "",
            replyform: false,
        }
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

  onAddChild(event){
    event.preventDefault()
    this.setState({
      replyform: true
    })
  }

  onHideChild(event){
    event.preventDefault()
    this.setState({
      replyform: false
    })
  }

  handleCommentSubmit() {
    this.setState({refresh: true})
    this.props.refreshlist()
  }

  render() {
    const params = this.getProps()
    const entry = params['data-data_comment']
    const config = params['data-params']['data-params']
    var reply = ""
    var button = <button type="button" className="reply-button" onClick={this.onAddChild}>Reply</button>
    if(this.state.replyform){
      var reply = <FormComment params={config} parent={entry.id} onCommentSubmit={this.handleCommentSubmit}  />
      var button = <button type="button" className="reply-button" onClick={this.onHideChild}>Reply</button>
    }
    const FormatDate = ({createdDate}) => (
            <FormattedDate
                value={createdDate}
                year='numeric'
                day='numeric'
                month='numeric'
                hour='numeric'
                minute='numeric'
            />
    )

    return (
      <div className="item-comment">
          <div className="comment__meta"><p className="author">{entry.attributes.name}</p>
          <p className="comment__time"><IntlProvider locale="en">
              <FormatDate createdDate={new Date(entry.attributes.created)}/>
          </IntlProvider></p></div>
          <div className="comment__content">
            <h3>{entry.attributes.subject}</h3>
            <div dangerouslySetInnerHTML={{ __html: entry.attributes.comment_body.value }} />
            {button}
            {reply}
          </div>
      </div>
    )
  }
}


export default Comment
