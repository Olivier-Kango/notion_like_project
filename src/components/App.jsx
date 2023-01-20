import '../styling/App.scss';
import EditablePage from './Page';

const App = () => (
  <div className="App">
    <h1>Front-end developer test project</h1>
    <hr />
    <p className="welcome">
      <span role="img" aria-label="greetings" className="Emoji">
        👋
      </span>
      {' '}
      Welcome to this App !
      You can add content below. Type
      {' '}
      <span className="Code">/</span>
      {' '}
      to see available elements.
    </p>
    <EditablePage />
  </div>
);

export default App;
