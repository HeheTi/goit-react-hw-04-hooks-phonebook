import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Input from '../../common/Input';
import s from './ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  resetForm() {
    this.setState({ name: '', number: '' });
  }

  addDataForm = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubFormData = e => {
    e.preventDefault();
    const { onSubmitForm } = this.props;

    const objData = { id: nanoid(), ...this.state };

    onSubmitForm(objData);
    this.resetForm();
  };

  render() {
    const { name, number } = this.state;

    return (
      <form onSubmit={this.onSubFormData} className={s.form}>
        <Input
          label="Name"
          type="text"
          name="name"
          onChange={this.addDataForm}
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />

        <Input
          label="Number"
          type="tel"
          name="number"
          onChange={this.addDataForm}
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />

        <button type="submit" className={s.btnAdd}>
          {' '}
          Add contact
        </button>
      </form>
    );
  }
}

export default ContactForm;
