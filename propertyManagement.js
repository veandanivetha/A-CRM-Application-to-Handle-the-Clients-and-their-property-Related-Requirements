import { LightningElement, api, track, wire } from 'lwc';
import getProperty from '@salesforce/apex/PropertHandler_LWC.getProperty';
import { getRecord } from 'lightning/uiRecordApi';
import USER_ID from '@salesforce/user/Id';

export default class PropertyManagement extends LightningElement {
  @api recordId;
  userId = USER_ID;  // Salesforce user ID
  verifiedvar;        // Stores the verified status of the user
  typevar;            // Stores the selected property type
  isfalse = true;     // Used to control display of search results
  istrue = false;     // Used to control display of "no results" message

  @track propertylist = [];  // Stores the list of properties returned by Apex

  // Columns for displaying data in the datatable
  columns = [
    { label: 'Property Name', fieldName: 'Property_Name__c' },
    { label: 'Property Type', fieldName: 'Type__c' },
    { label: 'Property Location', fieldName: 'Location__c' },
    { label: 'Property Link', fieldName: 'Property_link__c' },
  ];

  // Options for the combobox (Property Type)
  propetyoptions = [
    { label: 'Commercial', value: 'Commercial' },
    { label: 'Residential', value: 'Residential' },
    { label: 'Rental', value: 'rental' },
  ];

  // Wire service to get the current user's Verified status
  @wire(getRecord, { recordId: '$userId', fields: ['User.Verified__c'] })
  recordFunction({ data, error }) {
    if (data) {
      this.verifiedvar = data.fields.Verified__c.value;
    } else {
      console.error(error);
    }
  }

  // Handle combobox change event
  changehandler(event) {
    this.typevar = event.target.value;
  }

  // Handle search button click
  handleClick() {
    getProperty({ type: this.typevar, verified: this.verifiedvar })
      .then((result) => {
        this.isfalse = true;
        if (result != null && result.length !== 0) {
          this.istrue = true;
          this.propertylist = result;
        } else {
          this.isfalse = false;
          this.istrue = false;
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
