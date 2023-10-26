import React from 'react'
import Hero from '../assets/hero.png'
import '../styles/NewHome.css';

function home() {
  return (

      <section className="hero">
        <div className="container">

          <div className="hero-content">

            <h1 className="headline-large hero-title">Find a place where you can be yourself.</h1>

            <p className="body-large hero-text">
              If you're looking for a place where you can be yourself, don't give up. Keep searching until you find a place that feels like home.
            </p>

            <form action="./" method="get" className="search-bar">

              <label className="search-item">
                <span className="label-medium label">Want to</span>

                <select name="want-to" className="search-item-field body-medium">
                  <option value="buy" selected>Buy</option>
                  <option value="sell" >Sell</option>
                  <option value="rent" >Rent</option>
                </select>

              </label>

              <label className="search-item">
                <span className="label-medium label">Property type</span>

                <select name="property-type" className="search-item-field body-medium">
                  <option value="any" selected>Any</option>

                  <option value="Apartments" >Apartments</option>
                  <option value="Villa" >Villa</option>
                  <option value="Town House" >Townhome</option>
                  <option value="Bungalow" >Bungalow</option>
                  <option value="Loft" >Loft</option>
                </select>

                
              </label>

              <label className="search-item">
                <span className="label-medium label">Location</span>

                <input type="text" name="location" placeholder="Street, City, Zip..." class="search-item-field body-medium" />

                
              </label>

              <button type="submit" class="search-btn">
                 <span className="label-medium">Search</span>
              </button>

            </form>

          </div>

          <img src={Hero} width="816" height="659" role="presentation" className="hero-banner"/>


        </div>

      </section>

  )
}

export default home