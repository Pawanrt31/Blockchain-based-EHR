import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {PostData} from '../../services/PostData';
import UserFeed from "../UserFeed/UserFeed";
import { confirmAlert } from 'react-confirm-alert';
import '../../styles/react-confirm-alert.css';
import axios from 'axios';
import Linkify from 'react-linkify';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Login from '../../components/Login/Login';
const ipfsClient = require('ipfs-http-client')
class Doctordash extends Component {

constructor(props) {
super(props);
this.state = {
patid: 0,
filename: '',
filehash: '',
doc_id: 0,
added_file_hash: null,
redirectToReferrere: false
};

this.data = {};
this.ipfs = ipfsClient('/ip4/127.0.0.1/tcp/5001');
this.captureFile = this.captureFile.bind(this);
this.saveToIpfs = this.saveToIpfs.bind(this);
this.handleSubmit = this.handleSubmit.bind(this);
this.logout = this.logout.bind(this);
this.onChange = this.onChange.bind(this);
this.upload = this.upload.bind(this);
}
captureFile(event) {
    event.stopPropagation()
    event.preventDefault()
    if (document.getElementById('keepFilename').checked) {
      this.saveToIpfsWithFilename(event.target.files)
    } else {
      this.saveToIpfs(event.target.files)
    }
}
async saveToIpfs (files) {
    const source = this.ipfs.add(
      [...files],
      {
        progress: (prog) => console.log(`received: ${prog}`)
      }
    )
    try {
      for await (const file of source) {
        console.log(file)
        this.setState({ added_file_hash: file.path })
      }
    } catch (err) {
      console.error(err)
    }
}
async saveToIpfsWithFilename (files) {
    const file = [...files][0]
    const fileDetails = {
      path: file.name,
      content: file
    }
    const options = {
      wrapWithDirectory: true,
      progress: (prog) => console.log(`received: ${prog}`)
    }

    const source = this.ipfs.add(fileDetails, options)
    try {
      for await (const file of source) {
        console.log(file)
        this.setState({ added_file_hash: file.cid.toString() })
      }
    } catch (err) {
      console.error(err)
    }
}
handleSubmit (event) {
    event.preventDefault()
  }
upload() {
if(this.state.patid && this.state.filename && this.state.filehash){
PostData('upload',this.state).then((result) => {
if(result.success)
{
	alert(result.success);
}
else
	alert(result.error);
this.setState({redirectToReferrere: true});
}
);
}
else
	alert("Please enter all the fields");
document.getElementById("myform").reset();
}
onChange(e){
this.setState({[e.target.name]:e.target.value});
}

logout(){
if(this.state.redirectToReferrere)
{
return (<Redirect to={'/login'}/>)
}
}


render() {
this.data = JSON.parse(sessionStorage.getItem('userData'));
this.state.doc_id = this.data.doc_id;
return (
<div className="row" id="Body">
<div className="medium-12 columns">
<h1> Welcome Doctor </h1>
<a href="/login" onClick={this.logout} className="logout">Logout</a>
<Tabs>
    <TabList>
      <Tab>View details</Tab>
	  <Tab>List of patients</Tab>
	  <Tab>Patient approval</Tab>
	  <Tab>Uploading reports</Tab>
    </TabList>
 
    <TabPanel>
      <h2>Account</h2>
	  <h4>Name: { this.data.name }</h4>
	  <h4>Username: {this.data.username }</h4>
	  <h4>Email: { this.data.email }</h4>
	  <h4>Address: { this.data.address }</h4>
	  <h4>Blood Group: {this.data.bloodgrp }</h4>
    </TabPanel>
	<TabPanel>
      <h2>Patients listing</h2>
    </TabPanel>
	<TabPanel>
      <h2>Approval</h2>
    </TabPanel>
	<TabPanel>
      <h2>Upload</h2>
	  <div className="row " id="sBody">
	  <div className="medium-5 columns left">
	  <form id="myform">
	  <input type="number" name="patid" placeholder="Patient ID" onChange={this.onChange}/>
	  <input type="text" name="filename" placeholder="File name" onChange={this.onChange}/>
	  <form id='captureMedia' onSubmit={this.handleSubmit}>
          <input type='file' onChange={this.captureFile} /><br/>
          <label htmlFor='keepFilename'><input type='checkbox' id='keepFilename' name='keepFilename' /> keep filename</label>
	  </form>
	  <div>
		<label>Hash(Note: Please copy the hash that will be generated after choosing file into the input box below)</label><a target='_blank'
			href={'https://ipfs.io/ipfs/' + this.state.added_file_hash}>
				{this.state.added_file_hash}</a>
	  </div>
	  <input type="text" name="filehash" placeholder="File Hash" onChange={this.onChange}/>
	  <input type="button" className="button" value="Upload" onClick={this.upload}/>
	  </form>
	  </div>
	  </div>
    </TabPanel>
  </Tabs>
</div>
</div>
);
}
}

export default Doctordash;