import "../css/custom_container.css";
export default function CustomContainer({ name, onClick }) {
  return (
    <div className="customContainer" onClick={onClick}>
      {name}
    </div>
  );
}
