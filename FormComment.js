const React = require('react')

const axios = require('axios')

class FormComment extends React.Component {
  state = {
    firstName: "",
    email: "",
    subject: "",
    message: "",
    parent: "",
    formErrors: {email: '', message: ''},
    emailValid: false,
    messageValid: false,
    formValid: false,
    data: [],
  }

  // Alter data state
  handleInputChange = event => {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value,
    })
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

  //Validate email & message field
  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let messageValid = this.state.messageValid;

    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'message':
        messageValid = value.length > 0;
        fieldValidationErrors.message = messageValid ? '': ' is required';
        this.setState({messageValid, messageValid});
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    messageValid: messageValid
                  }, this.validateForm);
  }

  //Validate form
  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.messageValid});
  }

  //function submit form
  handleSubmit = event => {
    event.preventDefault()
    if(this.state.email.length > 0){
      this.validateField('email', this.state.email)
    }
    this.validateField('message', this.state.message)
    const errors = this.state.formErrors
    if(errors['email'].length == 0 && errors['message'].length == 0)
    {
      const params = this.getProps()
      const headers = {
        'Content-Type': "application/vnd.api+json",
        'Accept': "application/vnd.api+json",
      }
      const comment = this.CreateData(params)
      //POST Query to save comment
      axios({
          method: "POST",
          url: params['data-params']['data-url_api'],
          auth: {
            username: params['data-params']['data-login_api'],
            password: params['data-params']['data-password_api']
          },
          headers: headers,
          data: comment
        })
          .then(res => {
            this.props.onCommentSubmit();
          })
          .catch(err => {
            console.log("error in request", err);
          });

    }
    
  }

  CreateData(params){
    //create data of comment
      var parent = null
      if (params['data-parent']) {
        var parent = {
                        "type": `comment--${params['data-params']['data-type_comment']}`,
                        "id": params['data-parent']
                    }
      }
      const comment = {
          "data": {
              "type": `comment--${params['data-params']['data-type_comment']}`,
              "attributes": {
                  "status": true,
                  "subject": this.state.subject,
                  "name": this.state.firstName,
                  "mail": this.state.email,
                  "entity_type": params['data-params']['data-entity_type'],
                  "field_name": params['data-params']['data-field_name'],
                  "comment_body": {
                      "value": this.state.message,
                      "format": "basic_html"
                  }
              },
              "relationships": { 
                  "entity_id": {
                      "data": {
                          "type": `${params['data-params']['data-entity_type']}--${params['data-params']['data-type_content']}`,
                          "id": params['data-params']['data-entity_id']
                      }
                  },
                  "pid": {
                    "data": parent
                  }
                }
             }    
          } 
      return comment;
  }

  render() {
    const params = this.getProps()
    const formErrors = this.state.formErrors
    return (
        <div className="drupal-form-comments">
          <form className="drupal-form-comment" onSubmit={this.handleSubmit}>
            <div className="field-input">
              <label>Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="Name"
                value={this.state.firstName}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="field-input">
              <label>Email</label>
              <input
                className={formErrors["email"].length > 0 ? "error-message" : ""}
                type="text"
                name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleInputChange}
              />
            </div>
             <div className="field-input">
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={this.state.subject}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="field-input">
              <label>Message *</label>
              <textarea
                className={formErrors["message"].length > 0 ? "error-message" : ""}
                name="message"
                placeholder="Message *"
                value={this.state.message}
                onChange={this.handleInputChange}
              ></textarea>
            </div>
            <input
                type="hidden"
                name="parent"
                value={params['data-parent']}
              />
            <button type="submit">Send</button>
          </form>
        </div>         
    )
  }
}


export default FormComment
