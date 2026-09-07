import "./Controls.css";

export function Controls({ wallColor, onWallColorChange, transformMode, onTransformModeChange }) {
  return (
    <div className="controls">
      <label className="controlItem">
        Color de pared:{" "}
        <input
          type="color"
          value={wallColor}
          onChange={(e) => onWallColorChange(e.target.value)} 
        />
      </label>
      
      <label className="controlItem">
        Modo de movimiento:{" "}
        <select
          value={transformMode}
          onChange={(e) => onTransformModeChange(e.target.value)}
          className="select"
        >
          <option value="translate">Mover</option>
          <option value="rotate">Rotar</option>
        </select>
      </label>
    </div>
  );
}