import { useState, type FormEvent } from "react";
import { Dialog } from "./Dialog";

export function NewDesignDialog({ designCount, onClose, onCreate, onViewPlans }: {
  designCount: number;
  onClose: () => void;
  onCreate: (name: string, budget: number) => void;
  onViewPlans: () => void;
}) {
  const [name, setName] = useState("");
  const [budget, setBudget] = useState("");
  const [error, setError] = useState("");
  const planFull = designCount >= 5;
  const nextCount = Math.min(designCount + 1, 5);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const numericBudget = Number(budget.replace(/\D/g, ""));
    if (planFull) return;
    if (!name.trim()) { setError("Ingresá un nombre para tu diseño."); return; }
    if (!Number.isSafeInteger(numericBudget) || numericBudget <= 0) { setError("Ingresá un presupuesto mayor a $ 0."); return; }
    setError("");
    onCreate(name.trim(), numericBudget);
  }

  return <Dialog title="Nuevo diseño" onClose={onClose} className="new-design-dialog">
    <form className="new-design-form" onSubmit={submit}>
      <div className="new-design-body">
        <div className="new-design-fields">
          <div className="new-design-field">
            <label htmlFor="design-name">Nombre de tu espacio</label>
            <input id="design-name" required maxLength={60} value={name} onChange={(event) => { setName(event.target.value); setError(""); }} />
          </div>
          <div className="new-design-field">
            <label htmlFor="design-budget">Presupuesto</label>
            <div className="currency-input">
              <span aria-hidden="true">$</span>
              <input id="design-budget" aria-describedby="budget-help" inputMode="numeric" required value={budget} onChange={(event) => { setBudget(event.target.value.replace(/\D/g, "").slice(0, 12).replace(/\B(?=(\d{3})+(?!\d))/g, ".")); setError(""); }} />
            </div>
          </div>
        </div>
        <p className="budget-help" id="budget-help">El presupuesto se va completando a medida que agregás muebles del marketplace. Lo podés cambiar cuando quieras.</p>
        <div className="new-design-plan">
          <strong>Plan Basic</strong>
          <div className="new-design-plan-track" role="progressbar" aria-label="Diseños del plan después de crear" aria-valuenow={nextCount} aria-valuemin={0} aria-valuemax={5}>
            <span style={{ width: `${nextCount / 5 * 100}%` }} />
          </div>
          <span>{planFull ? "Ya usaste 5 de 5 diseños" : `Vas a usar ${nextCount} de 5 diseños`}</span>
          <button type="button" onClick={onViewPlans}>Ver planes</button>
        </div>
        {error && <p className="form-error" role="alert">{error}</p>}
      </div>
      <div className="new-design-footer">
        <button type="button" className="button button-cancel" onClick={onClose}>Cancelar</button>
        <button type="submit" className="button button-primary" disabled={planFull}>Crear diseño</button>
      </div>
    </form>
  </Dialog>;
}
