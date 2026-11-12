import "./FlightRow.css";

type FlightRowProps = {
  flightNumber: string;
  airline: string;
  destination: string;
  time: string;
  status: string;
  onRowClick?: () => void;
};

const FlightRow = (props: FlightRowProps) => {
  const handleRowClicked = () => {
    console.log(props.flightNumber);
    if (props.onRowClick) {
      props.onRowClick();
    }
  };
  return (
    <tr onClick={handleRowClicked} style={{ cursor: "pointer" }}>
      <td className="flight-row-cell">{props.flightNumber}</td>
      <td className="flight-row-cell">{props.airline}</td>
      <td className="flight-row-cell">{props.destination}</td>
      <td className="flight-row-cell">{props.time}</td>
      <td className="status flight-row-cell">{props.status}</td>
    </tr>
  );
};

export default FlightRow;
