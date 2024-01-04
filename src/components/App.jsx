/* eslint-disable react/button-has-type */

import React from 'react';
import EditablePage from './Page';
import arrowH from '../assets/arrowH.svg';
import book from '../assets/book.svg';
import edit from '../assets/edit.svg';
import barImage from '../assets/barImage.svg';
import lapin from '../assets/lapin.png';
import count from '../assets/count.svg';
import button from '../assets/button.svg';
import button2 from '../assets/button2.svg';
import button3 from '../assets/button3.svg';
import mark from '../assets/mark.png';
import '../styling/App.scss';
import '../styling/Header.scss';
import '../styling/Bar.scss';

const App = () => (
  <div className="App">
    {/* Header */}
    <header>
      <div className="header-div">
        <ul>
          <img src={arrowH} alt="arrowH" id="arrowH" />
          <img src={book} alt="book" />
          <li>Main</li>
          <li>/</li>
          <li>Getting Started</li>
          <li>/</li>
          <li>Front-end developer test proje...</li>
        </ul>
      </div>
      <div className="edit-publish">
        <div className="edit">
          <img src={edit} alt="edit" />
          <span>Editing</span>
        </div>
        <div className="middle">|</div>
        <select className="publish">
          <option value="publish">Publish Space</option>
        </select>
      </div>
    </header>

    {/* Main */}
    <main>
      <section className="bar">
        <div className="search">
          <div className="P">P</div>
          <div className="middle">|</div>
          <div className="time">
            <img src={barImage} alt="barImage" />
            <div>0min</div>
          </div>
          <div className="middle">|</div>
          <img src={lapin} alt="lapin" className="lapin" />
          <div className="middle">|</div>
          <div className="count">
            <img src={count} alt="count" />
            <div>0</div>
          </div>
          <input type="text" className="input-s" />
          <div className="div-button">
            <button className="button">
              <img src={button} alt="button" />
            </button>
            <button className="button">
              <img src={button2} alt="button2" />
            </button>
            <button className="button">
              <img src={button3} alt="button3" />
            </button>
          </div>
        </div>
      </section>
      <section className="para">
        <h1>Front-end developer test project</h1>
        {/* eslint-disable-next-line max-len */}
        <p>Your goal is to make a page that looks exactly like this one, and has the ability to create H1 text simply by typing / then 1, then typing text, and hitting enter.</p>
        <EditablePage />
      </section>
    </main>

    <div className="icon-container">
      <img src={mark} alt="icon-mark" />
    </div>
  </div>
);

export default App;
