// const axios = require('axios');
// const React = require('react');
// const cookie = require('react-cookie');
// import asyncValidate from './validate/asyncValidate';
// const createReactClass = require('create-react-class');
// const RegisterPartTwo = createReactClass({
//     getInitialState: function () {
//         return {
//             age: '',
//             is_male: '',
//             seeking_male: ''
//         };
//     },
//     render: function () {
//         // const { handleSubmit } = this.props;

//         return (
//             <div>
//                 <div className="row">
//                     <div className="col-md-6">

//                         <input name="email" type="text" onChange={this.handleInputChange} value={this.state.email} placeholder="Email" />
//                     </div>
//                     <div className="col-md-6">
//                         <select name="is_male" onChange={this.handleInputChange}>
//                             <option>I am a</option>
//                             <option value="true">Guy</option>
//                             <option value="false">Girl</option>
//                         </select>

//                     </div>
//                 </div>
//                 <div className="row">
//                     <div className="col-md-6">
//                         <input name="password" type="password" onChange={this.handleInputChange} value={this.state.password} placeholder="Password" />

//                     </div>
//                     <div className="col-md-6">
//                         <select name="seeking_male" onChange={this.handleInputChange}>
//                             <option>Looking to meet a</option>
//                             <option value="false">Girl</option>
//                             <option value="true">Guy</option>
//                         </select>
//                     </div>
//                 </div>
//             </div>
//         );
//     },

//     handleInputChange(event) {
//         const target = event.target;
//         const value = target.value;
//         const name = target.name;

//         this.setState({
//             [name]: value
//         });
//     }
// })

// module.exports = RegisterPartTwo;