import reactLogo from './react-logo.svg';
import bokehLogo from './bokeh-logo.png';
import './App.css';
import Plot from './Plot'

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <span>
        <img src={reactLogo} className="App-logo" alt="react-logo" />
        <img src={bokehLogo} className="App-logo" alt="bokeh-logo" />
      </span>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://docs.bokeh.org/en/latest/index.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          Bokeh in React
        </a>
      </header>
      <Plot/>
    </div>
  );
}

export default App;
