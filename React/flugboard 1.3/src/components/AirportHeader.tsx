import "./AirportHeader.css";

const AirportHeader = (
  { airportName, subtitle }: { airportName: string; subtitle: string },
) => {
  return (
    <header>
      <h1 className="airport-title">✈ FlugBoard 1.3</h1>
      <p className="airport-subtitle">{airportName}</p>
      <p className="substitle">{subtitle}</p>
    </header>
  );
};

export default AirportHeader;
