const React = require('react')
const axios = require('axios');
import asyncValidate from './validate/asyncValidate';
const cookie = require('react-cookie');
const Scroll = require('react-scroll');
const Link = Scroll.Link;
const Element = Scroll.Element;
const Events = Scroll.Events;
const scroll = Scroll.animateScroll;
const scrollSpy = Scroll.scrollSpy;
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');

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
    return {
      showRegistration: false,
      showPartOne: false,
      email: '',
      firstName: '',
      password: '',
      age: '',
      is_male: '',
      seeking_male: ''
    };
  },
  handleSubmit: function (e) {
    e.preventDefault();
    axios.post('http://localhost:3000/api/auth/register', {
      email: this.state.email,
      firstName: this.state.firstName,
      password: this.state.password,
      age: this.state.age,
      is_male: this.state.is_male,
      seeking_male: this.state.seeking_male
    })
      .then((response) => {
        cookie.save('token', response.data.token, { path: '/' });
        cookie.save('user', response.data.user, { path: '/' });

        window.location.href = 'http://localhost:8080/my-profile';
      })
      .catch((err) => {
        console.log(err);
      });
  },
  onClick() {
    this.setState({ showRegistration: true, showPartOne: true });
    scroll.scrollTo(100);
  },
  onContinueClick() {
    this.setState({ showPartOne: false });
  },
  onBackClick() {
    this.setState({ showPartOne: true });
  },
  render() {
    return (
      <div className="home">
        <div className="section hms-one">
          <div className="row">

            <div className="col-sm-12 col-xs-12 flexed">
              <div className="title">
                <h1>Simply See, Simply Match.</h1>

                <div className="sub-ct">
                  <span className="subtitle">The dating game just got easy.</span>
                </div>

                <div className="flex-inline">

                  <button className="btn btn-lg abt-btn">about seemē</button>
                  <Link to="registersection" spy={true} smooth={true} offset={0} duration={350}>
                    <button className="btn btn-lg crt-btn" onClick={this.onClick}>create account</button>
                  </Link>

                </div>
              </div>
            </div>
          </div>
        </div>

        <span id="registersection" />

        {this.state.showRegistration ?
          <div className="section hms-two">
            <div className="row">
              <div className="col-sm-12 col-xs-12 flexed">
                <div className="title">
                  <h1 className="reg-title">Take A Look. Meet Your Match.</h1>
                </div>
                <form id="register" onSubmit={this.handleSubmit}>

                  {this.state.showPartOne
                    ? <div>
                      <div className="partOne">
                        <h4 className="center">CREATE YOUR LOGIN</h4>
                        <div className="flexed">

                          <div>
                            <input placeholder="First Name" name="firstName" onChange={this.handleInputChange} value={this.state.firstName} type="text" />
                          </div>

                          <div>
                            <input name="email" type="text" onChange={this.handleInputChange} value={this.state.email} placeholder="Email" />
                          </div>

                          <div>
                            <input name="password" type="password" onChange={this.handleInputChange} value={this.state.password} placeholder="Password" />
                          </div>
                        </div>

                        <div className="flexed-row">
                          <button className="btn btn-lg btn-continue" onClick={this.onContinueClick}>Next</button>
                        </div>
                      </div>
                    </div>

                    : <ReactCSSTransitionGroup transitionName="fade">
                      <div>
                        <div className="partTwo">
                          <h4 className="center">MATCHING DETAILS</h4>
                          <div className="flexed">

                            <div>
                              <input name="age" type="text" onChange={this.handleInputChange} value={this.state.age} placeholder="Age" />
                            </div>
                            <div>
                              <select name="is_male" onChange={this.handleInputChange}>
                                <option>I am a</option>
                                <option value="true">Guy</option>
                                <option value="false">Girl</option>
                              </select>
                            </div>
                            <div>
                              <select name="seeking_male" onChange={this.handleInputChange}>
                                <option>Looking to meet a</option>
                                <option value="false">Girl</option>
                                <option value="true">Guy</option>
                              </select>
                            </div>
                          </div>

                          <div className="flexed-row">
                            <button onClick={this.onBackClick} className="btn btn-lg btn-back">Back</button>
                            <input type="submit" className="btn btn-lg crt-btn" value="Create Account" />

                          </div>
                        </div>
                      </div>
                    </ReactCSSTransitionGroup>
                  }

                </form>
              </div>
            </div>
          </div>

          : null
        }

      </div>
    );
  },
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
})

module.exports = HomePage;
