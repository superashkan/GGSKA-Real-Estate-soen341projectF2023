import React from 'react'
import Hero from '../static/images/hero.png'
import '../static/css/NewHome.css';

function home() {
  return (

      <section className="hero">
        <div className="container">

          <div className="hero-content">

            <h1 className="headline-large hero-title">Find a place where you can be yourself.</h1>

            <p className="body-large hero-text">
              If you're looking for a place where you can be yourself, don't give up. Keep searching until you find a place that feels like home.
            </p>

          </div>

          <img src={Hero} alt="A nice-looking house." width="816" height="659" role="presentation" className="hero-banner"/>


        </div>

      </section>

  )
}

export default home