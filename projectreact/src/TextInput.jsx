export default function TextInput({ value, onChange, placeholder }) {
  return (
    <input
      value={value}
      placeholder={placeholder}
      onChange={e => onChange(e.target.value)}
      style={{ marginRight: "10px" }}
    />
  );
}