const React = require('react')
const Register = require('../auth/register')
const cookie = require('react-cookie');

const HomePage = React.createClass({
  componentWillMount() {
    const user = cookie.load('user');
    if (user !== undefined) {
            window.location.href = 'http://localhost:8080/my-profile';
        } else {
          return;
        }
  },
  getInitialState() {
    return { showRegistration: false };
  },

  onClick() {
    this.setState({ showRegistration: true });
  },

  render() {
    return (
      <div>
        <div className="row">

          <div className="col-sm-6 col-xs-12">
            <div className="title">
              <h1>seemē.</h1>
              <h3>choose how people see you. no more reading profiles. no more writing profiles. just snap your profile looks - a.k.a. videos - and let peoplewith your feelings in mind, seemē enables you to never feel compelled to ask, "what does he mean by that?", ever again!</h3>
            <button className="btn btn-lg btn-success" onClick={this.onClick}>create your seemē profile</button>
            </div>            
          </div>

          <div id="register-box" className="col-sm-6 col-xs-12">
            <h2>Create Your seemē Profile.</h2>
            <h3><span className="sm-inline">It's free and always will be.</span></h3>
            {this.state.showRegistration ? <Register /> : null}
          </div>

        </div>

      </div>
    );
  }
})

module.exports = HomePage;

// <h3>Meet new people and jive with new personalities. Live your life, fully. Love who you're with. Be who you are. "We want you to simply, seemē."</h3>