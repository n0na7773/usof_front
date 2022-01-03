import React from 'react';
import css from './Home.module.scss';
import Vector from "../store/img/Vectors.png"
import Lines from "../store/img/Lines.png"

const Home = (props) => {
  return (
    <div className={css.Main}>
      <span className={css.FeelText}>Feel free to ask</span>
      <img src={Vector} className={css.VectorImg}/>
      <img src={Lines} className={css.LinesImg}/>
    </div>
  );
};

export default Home;
