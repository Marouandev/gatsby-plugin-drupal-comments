import Comment from './Comment'
import ChildComment from './ChildComment'

const React = require('react')

const axios = require('axios')

class ListComment extends React.Component {
  constructor(props) {
        super(props)

        // Bind the this context to the handler function
        this.refreshlist = this.refreshlist.bind(this);

        // Set some state
        this.state = {
            comments: [],
            reload: false
        };
  }

  componentDidMount() {
    const params = this.getProps()
    const sort = "&sort[sort-created][path]=created&sort[sort-created][direction]=DESC"
    axios({
          method: "GET",
          url: `${params['data-params']['data-url_api']}?filter[entity_id.id][value]=${params['data-params']['data-entity_id']}${sort}`,
        }).then(res => {
            this.setState({
                    comments: res.data.data
                });
          })
          .catch(err => {
            console.log("error in request", err);
          });
  }

  componentWillReceiveProps(props) {
    const { refresh, id } = this.props;
    const params = this.getProps()
    const sort = "&sort[sort-created][path]=created&sort[sort-created][direction]=DESC"
    if (props.refresh !== refresh) {
      axios({
          method: "GET",
          url: `${params['data-params']['data-url_api']}?filter[entity_id.id][value]=${params['data-params']['data-entity_id']}${sort}`,
        }).then(res => {
            this.setState({
                    comments: res.data.data
                });
          })
          .catch(err => {
            console.log("error in request", err);
          });
    }
  }

  refreshlist(){
    const params = this.getProps()
    const sort = "&sort[sort-created][path]=created&sort[sort-created][direction]=DESC"

    axios({
          method: "GET",
          url: `${params['data-params']['data-url_api']}?filter[entity_id.id][value]=${params['data-params']['data-entity_id']}${sort}`,
        }).then(res => {
            this.setState({
                    comments: res.data.data
                });
          })
          .catch(err => {
            console.log("error in request", err);
          });
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

  render() {
    const params = this.getProps()
    var comments = "loading..."
    if (this.state.comments && this.state.comments.length > 0 ) {
        var data = this.state.comments
        var comments = data.map((entry, index) => {
          var parent = ""
          var child = ""
          if(entry.relationships.pid.data == null){
            var parent = <Comment params={params} data_comment={entry} refreshlist={this.refreshlist}/>
          }
          var child = <ChildComment params={params} url_api={params['data-params']['data-url_api']} pid={entry.id} />
          
          return <React.Fragment key={index}>
                    {parent}
                    {child}
                  </React.Fragment>
        })
    }
      
    return (
      <div className="drupal-list-comments">
          <div className="list-comments"> {comments}</div>
      </div>
    )
  }
}


export default ListComment