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
class Doctordash extends Component {

constructor(props) {
super(props);

this.state = {
contacts:[],
redirectToReferrer: false,
};

this.logout = this.logout.bind(this);
}

componentDidMount() {
	let data = JSON.parse(sessionStorage.getItem('userData'));
	console.log(data.doc_id);
}

logout(){
sessionStorage.clear();
this.setState({redirectToReferrer: true});
}

render() {
if (this.state.redirectToReferrer) {
return (<Redirect to={'/login'}/>)
}
return (
<div className="row" id="Body">
<div className="medium-12 columns">
<h1> Welcome Doctor </h1>
<a href="#" onClick={this.logout} className="logout">Logout</a>
<Tabs>
    <TabList>
      <Tab>View details</Tab>
	  <Tab>List of patients</Tab>
	  <Tab>Patient approval</Tab>
	  <Tab>Uploading reports</Tab>
    </TabList>
 
    <TabPanel>
      <h2>Account</h2>
    </TabPanel>
	<TabPanel>
      <h2>Patients listing</h2>
    </TabPanel>
	<TabPanel>
      <h2>Approval</h2>
    </TabPanel>
	<TabPanel>
      <h2>Upload</h2>
    </TabPanel>
  </Tabs>
</div>
</div>
);
}
}

export default Doctordash;