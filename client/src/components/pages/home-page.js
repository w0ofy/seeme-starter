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
              <h1>See More, See Mē.</h1>
              <div className="one-liner-ct">
                <div className="img-ct">
                  <img src="src/public/img/no-typing.png" height="120px" width="120px" />
                </div>
                <div className="inline-txt-ct">
                  <span className="inline-txt">No more typing complicated "about me's".</span>
                </div>
              </div>

              <div className="one-liner-ct">
                <div className="img-ct">
                  <img src="src/public/img/no-reading.png" height="120px" width="120px" />
                </div>
                <div className="inline-txt-ct">
                  <span className="inline-txt">No more reading elusive profiles and "interests".</span>
                </div>
              </div>

              <div className="one-liner-ct">
                <div className="img-ct">
                  <img src="src/public/img/heartme.png" height="120px" width="120px" />
                </div>
                <div className="inline-txt-ct">
                  <span className="inline-txt">Simply see, and simply match.</span>
                </div>
              </div>

              <div className="one-liner-ct">
                <div className="img-ct">
                  <img src="src/public/img/heartme.png" height="120px" width="120px" />
                </div>
                <div className="inline-txt-ct">
                  <span className="inline-txt">We help you meet new people through "Looks" they choose to let you see. Looks are 10s videos created by each person. Record whatever you want. Just keep it PG, perverts. Our API to filter your nasty videos isn't implemented yet.</span>
                </div>
              </div>


              <button className="btn btn-lg btn-success" onClick={this.onClick}>create your seemē profile</button>
            </div>
          </div>

          <div className="col-sm-2 col-xs-12">
          </div>
          <div id="register-box" className="col-sm-4 col-xs-12">
            <h1>Create Your seemē Profile.</h1>
            <h3><span className="sm-inline">It's free and always will be.</span></h3>
            {this.state.showRegistration ? <Register /> : null}
          </div>

        </div>

      </div>
    );
  }
})

module.exports = HomePage;