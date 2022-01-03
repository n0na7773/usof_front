import React from 'react';
import css from './Home.module.scss';

const Home = (props) => {
  return (
    <div className={css.Main}>
      <span className={css.FeelText}>Feel free to ask</span>
    </div>
  );
};

export default Home;
