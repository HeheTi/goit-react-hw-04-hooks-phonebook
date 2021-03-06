import { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import ItemContact from './ItemContact';
import s from './ContactList.module.css';

const ContactList = props => {
  const { filterName, filterContacts, onClickBtnDel, normalizeName } = props;

  return (
    <ul className={s.list}>
      {filterContacts(filterName).map(({ id, name, number }) => {
        return (
          <ItemContact
            id={id}
            key={id}
            name={name}
            number={number}
            onClickBtnDel={onClickBtnDel}
            normalizeName={normalizeName}
          />
        );
      })}
    </ul>
  );
};

ContactList.propTypes = {
  filterName: PropTypes.string,
  filterContacts: PropTypes.func,
  onClickBtnDel: PropTypes.func,
  normalizeName: PropTypes.func,
};

export default memo(ContactList);
