import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import s from './Input.module.css';

const id = nanoid();

const Input = ({ label, ...arg }) => {
  return (
    <div className={s.wrapperInput}>
      <label className={s.labelTitle} htmlFor={id}>
        {label}:
      </label>
      <input className={s.input} id={id} {...arg} />
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  arg: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.func,
  ]),
};

export default Input;
