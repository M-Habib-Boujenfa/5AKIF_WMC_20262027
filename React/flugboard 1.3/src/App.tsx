import "./App.css";
import AirportHeader from "./components/AirportHeader";
import FlightRow from "./components/FlightRow";
import Welcome from "./components/Welcome";

const App = () => {
  return (
    <div className="app-page">
      <AirportHeader
        airportName="Flughafen Wien-Schwechat"
        subtitle="This a subtitle for exercice 1.3"
      />
      <Welcome name="Habib" />

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
          <FlightRow
            flightNumber="OS123"
            airline="Austrian Airlines"
            destination="London Heathrow (LHR)"
            time="10:30"
            status="Pending"
            onRowClick={() => console.log("I am the Flight row one")}
          />
          <FlightRow
            flightNumber="LH456"
            airline="Lufthansa"
            destination="Frankfurt (FRA)"
            time="11:15"
            status="Pending"
            onRowClick={() => console.log("I am flight row 2")}
          />
          <FlightRow
            flightNumber="BA234"
            airline="British Airways"
            destination="London Heathrow (LHR)"
            time="12:00"
            status="Pending"
          />
          <FlightRow
            flightNumber="AU156"
            airline="Classic Airline"
            destination="Where you want"
            time="25:65"
            status="Pending"
            onRowClick={() => alert("And I am the 4")}
          />
        </tbody>
      </table>
    </div>
  );
};

export default App;
