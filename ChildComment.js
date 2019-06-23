import {IntlProvider, FormattedDate} from 'react-intl';
import Comment from './Comment';

const React = require('react')

const axios = require('axios')

class ChildComment extends React.Component {
  state = {
    childcomments: [],
  }
  componentDidMount() {
    const params = this.getProps()
    const sort = "&sort[sort-created][path]=created&sort[sort-created][direction]=DESC"
    axios({
          method: "GET",
          url: `${params['data-url_api']}?filter[pid.id][value]=${params['data-pid']}${sort}`,
        }).then(res => {
            this.setState({
                    childcomments: res.data.data
                });

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
    var comments = ""
    var title = ""
    if (this.state.childcomments && this.state.childcomments.length > 0 ) {
        const data = this.state.childcomments
        var comments = data.map((entry, index) => {
           return <Comment params={params} key={index} data_comment={entry} />
        })
        var title = "Comments"
    }
      
    return (
          <div className="child-comments">{comments}</div>
    )
  }
}


export default ChildComment
