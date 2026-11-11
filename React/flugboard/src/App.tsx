import "./App.css";

function App() {
  {
    /*
    1) className statt class
      <div className="warning">Falsch</div>

    2) Selbstschließende Tags benötigen />
      <br />
      <input type="text" />

    3)  Nur EIN Root-Element

      Falsch :
        <h1>Titel</h1>
        <p>Text</p>

      Richtig :
        <>
          <h1>Titel</h1>
          <p>Text</p>
        </>

      4) Kommentare in JSX
          {/stern  stern/}

      5) htmlFor statt for (für Label-Elemente)
          <label htmlFor="email">E-Mail:</label>
    */
  }

  return (
    <>
      <div id="titel">
        <div className="spacer"></div>
        <h1>Welcome to Test Airport</h1>
        <h3>{new Date().toLocaleTimeString("de-AT")}</h3>
      </div>
      <h2>This is an exercise for practicing React.</h2>
      <p>My first React project. Let's see what we can do.</p>
      <div className="app-page">
        <h1 className="app-heading">&#9992; FlugBoard Test</h1>
        <p className="app-subheading">Flughafen Wien-Schwechat</p>

        <section>
          <h2 className="section-heading">Abflüge</h2>
          <table className="flight-table">
            <thead>
              <tr>
                <th>Flug</th>
                <th>Airline</th>
                <th>Ziel</th>
                <th>Zeit</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>OS123</td>
                <td>Austrian Airlines</td>
                <td>London Heathrow (LHR)</td>
                <td>10:30</td>
                <td>
                  <span className="status-badge status-boarding">
                    Boarding
                  </span>
                </td>
              </tr>

              <tr>
                <td>LH456</td>
                <td>Lufthansa</td>
                <td>Frankfurt (FRA)</td>
                <td>11:15</td>
                <td>
                  <span className="status-badge status-delayed">
                    Verspätet
                  </span>
                </td>
              </tr>

              <tr>
                <td>BA234</td>
                <td>British Airways</td>
                <td>London Heathrow (LHR)</td>
                <td>12:00</td>
                <td>
                  <span className="status-badge status-on-time">
                    Pünktlich
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>

      <div className="app-page">
        <h1 className="app-heading">&#9992; FlugBoard Test</h1>
        <p className="app-subheading">Flughafen Wien-Schwechat</p>

        <section>
          <h2 className="section-heading">Ankünfte</h2>
          <table className="flight-table">
            <thead>
              <tr>
                <th>Flug</th>
                <th>Airline</th>
                <th>Ziel</th>
                <th>Zeit</th>
                <th>Terminal</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>EK789</td>
                <td>Emirates</td>
                <td>Dubai</td>
                <td>09:45</td>
                <td>Noch nicht</td>
                <td>
                  <span className="status-badge status-boarding">
                    Boarding
                  </span>
                </td>
              </tr>

              <tr>
                <td>TK567</td>
                <td>Turkish Airlines</td>
                <td>Istanbul</td>
                <td>13:20</td>
                <td>Noch nicht</td>
                <td>
                  <span className="status-badge status-delayed">
                    Verspätet
                  </span>
                </td>
              </tr>

              <tr>
                <td>WZ112</td>
                <td>Wizz Air</td>
                <td>Budapest</td>
                <td>15:30</td>
                <td>Noch nicht</td>
                <td>
                  <span className="status-badge status-on-time">
                    Pünktlich
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
}

export default App;
