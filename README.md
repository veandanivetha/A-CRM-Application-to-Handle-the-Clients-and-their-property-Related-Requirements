# CRM Application: Client & Property Management

This is a Customer Relationship Management (CRM) application designed for handling clients and their property-related requirements. Built on Salesforce, it allows businesses to manage client information, track property listings, handle inquiries, and manage property transactions.

---

## Features

- **Client Management**: Store and manage detailed client information including contact details, preferences, and interactions.
- **Property Management**: Add, update, and track properties, including details such as location, type, and status.
- **Client-Property Association**: Associate clients with specific properties they're interested in or have inquired about.
- **Inquiry Management**: Record and manage property inquiries from clients and track their requirements.
- **Transaction Tracking**: Track the status of property transactions (e.g., sale, rental, purchase).
- **Reports & Dashboards**: Generate reports on properties, client inquiries, and sales performance.

---

## Custom Objects

### 1. **Client Object (`Client__c`)**
Stores information about clients.

- **Fields**:
  - `Name`: Name of the client (Text)
  - `Email`: Email address (Email)
  - `Phone`: Client's phone number (Phone)
  - `Address`: Client's address (Text)
  - `Preferences`: Property preferences (Picklist: Residential, Commercial, Rental)
  - `Verified`: Boolean field (indicating if the client is verified)

### 2. **Property Object (`Property__c`)**
Stores information about properties listed for sale or rent.

- **Fields**:
  - `Property Name`: Name of the property (Text)
  - `Location`: Location or address of the property (Text)
  - `Type`: Property type (Picklist: Residential, Commercial, Rental)
  - `Price`: Price of the property (Currency)
  - `Status`: Property status (Picklist: Available, Under Contract, Sold)
  - `Verified`: Boolean field (indicating if the property is verified)

### 3. **Inquiry Object (`Inquiry__c`)**
Stores information about property inquiries made by clients.

- **Fields**:
  - `Client`: Lookup relationship to `Client__c`
  - `Property`: Lookup relationship to `Property__c`
  - `Inquiry Date`: Date when the inquiry was made (Date/Time)
  - `Inquiry Type`: Type of inquiry (Picklist: Sale, Rental, Information Request)
  - `Status`: Status of the inquiry (Picklist: Pending, Completed)

---

## Lightning Web Components (LWC)

### Overview
The application includes several **Lightning Web Components** (LWC) to provide a rich user interface for interacting with clients, properties, and inquiries.

- **Client Management**: Add, view, and update client details.
- **Property Management**: Add and manage property listings, including searching properties by type and status.
- **Inquiry Management**: Capture client inquiries related to properties.

### Example of a Property Management LWC:
- **`PropertyManagement.js`**: Handles property list view and allows filtering by type (Commercial, Residential, Rental).
- **`PropertyManagement.html`**: Displays the property list using a `lightning-datatable` for easy data interaction.

```html
<template>
    <lightning-card title="Property Management">
        <lightning-button label="Add Property" onclick={handleAddProperty}></lightning-button>
        <lightning-datatable data={propertyList} columns={columns} key-field="id"></lightning-datatable>
    </lightning-card>
</template>
