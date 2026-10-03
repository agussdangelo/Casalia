import { useEffect, useRef, type ReactNode } from "react";
import { Icon } from "./Visuals";

export function Dialog({ title, children, onClose, drawer = false, className = "" }: { title: string; children: ReactNode; onClose: () => void; drawer?: boolean; className?: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    const input = dialog?.querySelector<HTMLInputElement>("input");
    input?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return <dialog ref={dialogRef} className={`app-dialog ${drawer ? "cart-drawer" : ""} ${className}`} aria-labelledby="dialog-title" onCancel={onClose} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="dialog-content">
      <div className="dialog-heading flex items-center justify-between gap-4">
        <h2 id="dialog-title">{title}</h2>
        <button className="icon-button" aria-label="Cerrar" onClick={onClose}>
          <Icon name="close" />
        </button>
      </div>
      {children}
    </div>
  </dialog>;
}
