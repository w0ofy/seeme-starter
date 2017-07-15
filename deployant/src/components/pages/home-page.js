import asyncValidate from './validate/asyncValidate';
import MdKeyboardArrowUp from 'react-icons/lib/md/keyboard-arrow-up';
import React, { Component } from 'react';
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');
const axios = require('axios');
const cookie = require('react-cookie');
const Scroll = require('react-scroll');
const Link = Scroll.Link;
const Element = Scroll.Element;
const Events = Scroll.Events;
const scroll = Scroll.animateScroll;
const scrollSpy = Scroll.scrollSpy;

class HomePage extends React.Component {
  componentWillMount() {
    const user = cookie.load('user');
    if (user !== undefined) {
      window.location.href = 'http://seemeapp.herokuapp.com/my-profile';
    } else {
      return;
    }
  }
  getInitialState() {
    return {
      showRegistration: false,
      showPartOne: false,
      showAbout: false,
      email: '',
      firstName: '',
      password: '',
      age: '',
      is_male: '',
      seeking_male: ''
    };
  }
  handleSubmit(e) {
    e.preventDefault();
    let removeScript = document.getElementById('disable-scroll');
    document.body.removeChild(removeScript);
    axios.post('http://seemeapp.herokuapp.com/api/auth/register', {
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

        window.location.href = 'http://seemeapp.herokuapp.com/my-profile';
      })
      .catch((err) => {
        console.log(err);
      });
  }
  onAboutClick() {
    this.setState({ showAbout: true });
    scroll.scrollTo(100);
  }
  onClick() {
    this.setState({ showRegistration: true, showPartOne: true });
    scroll.scrollTo(100);
  }
  hideRegistration() {
    const that = this;
    scroll.scrollToTop({ duration: 350 });
    setTimeout(function () {
      that.setState({ showRegistration: false, showPartOne: false });
    }, 351);

  }
  hideAbout() {
    const that = this;
    scroll.scrollToTop({ duration: 350 });
    setTimeout(function () {
      that.setState({ showAbout: false });
    }, 351);
  }
  onContinueClick() {
    this.setState({ showPartOne: false });
  }
  onBackClick() {
    this.setState({ showPartOne: true });
  }
  render() {
    return (
      <div id="home" className="home">
        <div className="section hms-one">
          <div className="row">

            <div className="col-sm-12 col-xs-12 flexed">
              <div className="title">
                <h1>Simply See, Simply Match.</h1>

                <div className="sub-ct">
                  <span className="subtitle">The dating game just got easy.</span>
                </div>

                <div className="flex-inline">
                  <Link to="registersection" spy={true} smooth={true} offset={0} duration={350}>
                    <button className="btn btn-lg abt-btn" onClick={this.onAboutClick}>about seemē</button>
                  </Link>
                  <Link to="registersection" spy={true} smooth={true} offset={0} duration={350}>
                    <button className="btn btn-lg crt-btn" onClick={this.onClick}>create account</button>
                  </Link>

                </div>
              </div>
            </div>
          </div>
        </div>

        <span id="registersection" />
        {this.state.showAbout ?
          <ReactCSSTransitionGroup transitionName="fade">
            <div className="section hms-two">
              <MdKeyboardArrowUp className="arrow-up" onClick={this.hideAbout} />
              <div>
                <h2>Seemē is...</h2>
                <h3>here so you can meet new people with different interests and explore places outside your comfort zone, in a safe way. Seemē is here to help you see <span className="italics">more</span>, in the people you aren't meeting everyday. Honest perspective is the mission.</h3>
              </div>
              <div>
                <h2>Seemē is not...</h2>
                <h3>another algorithmic dating app that matches you with other people based on interests and hobbies. No more writing "about me" snippets. No more reading elusive profiles. Say less, do more and make more meaningful choices.</h3>
              </div>
              <div>
                <h2>How?</h2>
                <h3>Take a profile video, post several videos under your profile - we call them "Looks" - and you're ready to go. Simply see, watch, swipe, match, chat, meet. See more, see mē.</h3>
              </div>
            </div>
          </ReactCSSTransitionGroup>
          : null}

        {this.state.showRegistration ?
          <ReactCSSTransitionGroup transitionName="fade">
            <div className="section hms-two">

              <MdKeyboardArrowUp className="arrow-up" spy={true} smooth={true} duration={350} onClick={this.hideRegistration} />

              <div className="row">
                <div className="col-sm-12 col-xs-12 flexed">
                  <div className="title">
                    <h1 className="reg-title">Take A Look. Meet Your Match.</h1>
                    <hr />
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
          </ReactCSSTransitionGroup>
          : null
        }
      </div>
    );
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }
};

export default HomePage;