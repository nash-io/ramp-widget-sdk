import logo from "./logo.svg";
import "./App.css";
import NashRampWidget from "./NashRampWidget";

function App() {
  return (
    <div className="App">
      <NashRampWidget
        env="LOCAL"
        base="eur"
        target="aave"
        destination="0x06e97748AD4E0A36490F92733EF95D8490ffD97f"
      />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;