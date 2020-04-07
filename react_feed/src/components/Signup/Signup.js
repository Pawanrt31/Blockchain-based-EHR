import React, {Component} from 'react';
import {PostData} from '../../services/PostData';
import {Redirect} from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
class Signup extends Component {
constructor(props){
super(props);
this.state = {
username: '',
password: '',
email: '',
name: '',
id: 0,
bloodgrp: '',
address: '',
redirectToReferrera: false
};
this.signup = this.signup.bind(this);
this.onChange = this.onChange.bind(this);
}

signup() {
if(this.state.username && this.state.password && this.state.email && this.state.name && this.state.bloodgrp && this.state.address){
PostData('signup',this.state).then((result) => {
if(result.success)
{
	alert(result.success);
}
else
	alert(result.error);
}
);
}
else
	alert("Please enter the details");
this.setState({redirectToReferrera: true});
}
onChange(e){
this.setState({[e.target.name]:e.target.value});
}
render() {
if (this.state.redirectToReferrera) {
return (<Redirect to={'/login'}/>)
}
return (
<div className="row " id="sBody">
<div className="medium-5 columns left">
<Tabs>
	<TabList>
	  <Tab>REGISTER PATIENT</Tab>
	  <Tab><a href="/signdoc">REGISTER DOCTOR</a></Tab>
	</TabList>
	<TabPanel>
	<h4>Signup</h4>
<input type="text" name="email" placeholder="Email" onChange={this.onChange}/>
<input type="text" name="name" placeholder="Name" onChange={this.onChange}/>
<input type="text" name="username" placeholder="Username" onChange={this.onChange}/>
<input type="password" name="password" placeholder="Password" onChange={this.onChange}/>
<input type="text" name="bloodgrp" placeholder="Blood Group" onChange={this.onChange}/>
<textarea name="address" rows="5" cols="20" placeholder="Address" onChange={this.onChange}/>
<input type="submit" className="button" value="Sign Up" onClick={this.signup}/>
</TabPanel>
</Tabs>
</div>
</div>
);
}
}
export default Signup;