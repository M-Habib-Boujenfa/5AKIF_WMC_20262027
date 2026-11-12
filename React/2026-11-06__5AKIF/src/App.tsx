import "./App.css";
import HalloKlasse from "./HalloKlasse.tsx";

function App() {
  return (
    <>
      {/* so schreibt man ein kommentar */}
      <h1>Hallo</h1>
      <p>I learn React</p>
      <HalloKlasse klassenName="5AKIF" stufe="Abschlussjahr" />
      <HalloKlasse klassenName="3AKIF" stufe="" />
    </>
  );
}

export default App;
