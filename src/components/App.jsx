/* eslint-disable react/button-has-type */

import React from 'react';
import '../styling/App.scss';
import EditablePage from './Page';

const App = () => (
  <div className="App">
    {/* Header */}
    <header>
      <div className="header-div">
        <ul>
          <img src="./assets/arrowH.svg" alt="arrowH" id="arrowH" />
          <img src="./assets/book.svg" alt="book" />
          <li>Main</li>
          <li>/</li>
          <li>Getting Started</li>
          <li>/</li>
          <li>Front-end developer test proje...</li>
        </ul>
      </div>
      <div className="edit-publish">
        <div className="edit">
          <img src="./assets/edit.svg" alt="edit" />
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
            <img src="./assets/barImage.svg" alt="barImage" />
            <div>0min</div>
          </div>
          <div className="middle">|</div>
          <img src="./assets/lapin.png" alt="lapin" className="lapin" />
          <div className="middle">|</div>
          <div className="count">
            <img src="./assets/count.svg" alt="count" />
            <div>0</div>
          </div>
          <input type="text" className="input-s" />
          <div className="div-button">
            <button className="button">
              <img src="./assets/button.svg" alt="button" />
            </button>
            <button className="button">
              <img src="./assets/button2.svg" alt="button2" />
            </button>
            <button className="button">
              <img src="./assets/button3.svg" alt="button3" />
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
      <img src="./assets/mark.png" alt="icon-mark" />
    </div>
  </div>
);

export default App;
