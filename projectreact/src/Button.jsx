export default function Button({ label, onClick }) {
  return (
    <button style={{ marginLeft: "5px" }} onClick={onClick}>
      {label}
    </button>
  );
}