import "./App.css";
import NashRampWidget from "./NashRampWidget";

function App() {
  return (
    <div className="App">
      <NashRampWidget
        env="PRODUCTION"
        base="eur"
        target="aave"
        destination="0x0000000000000000000000000000000000000000"
      />
    </div>
  );
}

export default App;
