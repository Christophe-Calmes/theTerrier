import React from 'react';
import imageSrc from '../../assets/images/HomeCardImg.png';
import './Home.css'
import '../../globals.css'
const Home = () => {
  return (
    <div className="container">
      <section>
        <div className="section__head">
          <span>Welcome to the Terrier</span>
        </div>

        <img className="homepage__image" src={imageSrc} alt="Home page image" />

        <button className="btn" onClick={() => console.log('Redirect to registration/login')}>
          Start Adventure
        </button>
      </section>
    </div>
  );
};

export default Home;