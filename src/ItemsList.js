import React from 'react';
import PropTypes from 'prop-types';
import css from './ItemsList.module.css';

const ItemsList = ({ items }) => (
  <ul className={css.list}>
    {items.map(({ id, avatar, link, login, name, bio, location, email }) => (
      <li key={id} className={css.listItem}>
        <img src={avatar} alt="avatar" className={css.avatar} />
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={css.link}
        >
          {login}
        </a>
        <span>{name}</span>
        <p>{bio}</p>
        <span className={css.location}>{location}</span>
        <span>{email}</span>
      </li>
    ))}
  </ul>
);

ItemsList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      avatar: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      login: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default ItemsList;
