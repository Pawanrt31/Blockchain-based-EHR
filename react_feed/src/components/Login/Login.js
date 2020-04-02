import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {PostData} from '../../services/PostData';
class Login extends Component {
constructor(){
super();
this.state = {
username: '',
password: '',
redirectToReferrer: false
};
this.login = this.login.bind(this);
this.onChange = this.onChange.bind(this);
}
login() {
if(this.state.username && this.state.password){
PostData('login',this.state).then((result) => {
let responseJson = result;
if(responseJson.userData){
let jsondata = JSON.stringify(responseJson.userData);
sessionStorage.setItem('userData',jsondata);
this.setState({redirectToReferrer: true});
}
else
alert(result.error);
});
}
else
	alert("Please enter username and password");
}
onChange(e){
this.setState({[e.target.name]:e.target.value});
}

render() {
if (this.state.redirectToReferrer) {
return (<Redirect to={'/doctordash'}/>)
}
if(sessionStorage.getItem('userData')){
return (<Redirect to={'/doctordash'}/>)
}
return (
<div className="row" id="Body">
<div className="medium-5 columns left">
<h4>Login</h4>
<input type="text" name="username" placeholder="Username" onChange={this.onChange}/>
<input type="password" name="password" placeholder="Password" onChange={this.onChange}/>
<input type="submit" className="button" value="Login" onClick={this.login}/>
<a href="/loginadmin" className="button">Admin login</a>
<a href="/signup" className="button">Registration</a>
<a href="/signdoc" className="button">Doctor registration</a>
</div>
</div>
);
}
}
export default Login;