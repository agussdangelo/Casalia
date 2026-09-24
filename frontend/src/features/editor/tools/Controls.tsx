import styles from  "./controls.module.css";

interface ControlsProps {
  wallColor: string;
  onWallColorChange: (color: string) => void;
  transformMode: "translate" | "rotate";
  onTransformModeChange: (mode: "translate" | "rotate") => void;
}

export function Controls({ wallColor, onWallColorChange, transformMode, onTransformModeChange }: ControlsProps) {
  return (
    <div className={styles.controls}>
      <label className={styles.controlItem}>
        Color de pared:{" "}
        <input
          type="color"
          value={wallColor}
          onChange={(e) => onWallColorChange(e.target.value)} 
        />
      </label>
      
      <label className={styles.controlItem}>
        Modo de movimiento:{" "}
        <select
          value={transformMode}
          onChange={(e) =>
            onTransformModeChange(e.target.value as "translate" | "rotate")
          }
          className={styles.select}
        >
          <option value="translate">Mover</option>
          <option value="rotate">Rotar</option>
        </select>
      </label>
    </div>
  );
}