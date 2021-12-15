import React, { Component } from 'react';

import ContactForm from '../ContactForm';
import ContactList from '../ContactList';
import Filter from '../Filter';
import * as storage from '../../services/localStorage.js';

const CONTACTS_KEY_LS = 'contacts';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const dataLocalStorage = storage.get(CONTACTS_KEY_LS);

    if (dataLocalStorage) {
      this.setState({ contacts: dataLocalStorage });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      storage.save(CONTACTS_KEY_LS, this.state.contacts);
    }
  }

  addDataApp = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  normalizeName = name =>
    name
      .split(' ')
      .map(word => {
        const firstUpCaseLetter = word.charAt(0).toUpperCase();
        const anoterLetter = word.substring(1);
        return `${firstUpCaseLetter}${anoterLetter}`;
      })
      .join(' ');

  addContacts = obj => {
    const isHaveName = this.state.contacts.some(
      ({ name }) => name === obj.name,
    );

    if (isHaveName) {
      return alert(`${this.normalizeName(obj.name)} is alredy in contacts.`);
    }

    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, obj],
      };
    });
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(item => item.id !== id),
      filter: '',
    }));
  };

  resetFilter = () => this.setState({ filter: '' });

  filterContacts = filterName => {
    const normalizedData = filterName.toLowerCase();
    const arrayFilter = this.state.contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedData),
    );
    return arrayFilter;
  };

  render() {
    const { filter, contacts, contactForChange } = this.state;

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm
          onSubmitForm={this.addContacts}
          dataForChange={contactForChange}
        />

        <h2>Contacts</h2>
        {contacts.length > 1 && (
          <Filter
            onChangeDate={this.addDataApp}
            value={contacts.length < 1 ? '' : filter}
          />
        )}
        {!contacts.length && <p>Please, add contact!</p>}
        {!!contacts.length && (
          <ContactList
            normalizeName={this.normalizeName}
            onClickBtnDel={this.deleteContact}
            filterContacts={this.filterContacts}
            filterName={filter}
          />
        )}
      </div>
    );
  }
}

export default App;

// deleteContact = () => {
//   const id = e.target.parentElement.id;
//   this.setState(prevState => ({
//     contacts: prevState.contacts.filter(item => item.id !== id),
//   }));
// };
