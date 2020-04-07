import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import './Admindash.css';
import {PostData} from '../../services/PostData';
import UserFeed from "../UserFeed/UserFeed";
import { confirmAlert } from 'react-confirm-alert';
import '../../styles/react-confirm-alert.css';
import axios from 'axios';
import Linkify from 'react-linkify';


class Admindash extends Component {

constructor(props) {
super(props);

this.state = {
contacts:[],
redirectToReferrer: false,
};
this.logout = this.logout.bind(this);
}

componentDidMount() {
    const url = 'http://localhost/react-php/api/details.php'
    axios.get(url).then(response => response.data)
    .then((data) => {
      this.setState({ contacts: data })
      console.log(this.state.contacts)
     })
  }



logout(){
//sessionStorage.setItem("userData",1234);
//sessionStorage.clear();
this.setState({redirectToReferrer: true});
}

render() {
if (this.state.redirectToReferrer) {
return (<Redirect to={'/login'}/>)
}
return (
<div className="row" id="Body">
<div className="medium-12 columns">
<h1> Welcome Admin </h1>
<a href="#" onClick={this.logout} className="logout">Logout</a>
<React.Fragment>

		<h1>Doctors listing</h1>
        <table border='1' width='120%' >
        <tr>
            <th>Doctor ID</th>
			<th>Name</th>
			<th>Username</th>
            <th>Email</th>
			<th>Password</th>
            <th>Address</th>
            <th>Blood Group</th>
            <th>File Hash</th>
			<th>Approval</th>
        </tr>

        {this.state.contacts.map((contacts) => (
        
		<tr>
            <td>{ contacts.doc_id}</td>
            <td>{ contacts.name }</td>
			<td>{ contacts.username }</td>
            <td>{ contacts.email }</td>
			<td>{ contacts.password }</td>
            <td>{ contacts.address }</td>
            <td>{ contacts.bloodgrp }</td>
			<td><a target='_blank'
    href={'https://ipfs.io/ipfs/' + contacts.filehash}>{ contacts.filehash }</a></td>
			<td><input type="submit" className="button" onClick={ (event) =>
				{
					
					let did = parseInt(contacts.doc_id);
					let uname = contacts.username;
					let pword = contacts.password;
					this.postData = {doct_id:did,username:uname,pasword:pword};
					PostData('changestat', this.postData).then((result) => {
						
						
					
					if(result.success)
					{
					alert(result.success);
					}
					else
					alert(result.error);
				}
				);
				}
				} 
			value="YES" /><input type="submit" className="button" onClick = { (event) =>
				{
					alert("Doctor not approved");
			} }value="NO" /></td>
        </tr>
        ))}
        </table>
</React.Fragment>
</div>
</div>
);
}
}

export default Admindash;