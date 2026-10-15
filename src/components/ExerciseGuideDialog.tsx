import { useEffect, useId, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";
import "../exercise-guide-dialog.css";

export type GuideStat = { label: string; value: string };

type Props = {
  title: string;
  subtitle: string;
  media: ReactNode;
  stats: GuideStat[];
  instruction: string;
  onClose: () => void;
  credit?: string;
};

/** Centraliza a execução; mantém o GIF visível e os dados legíveis no celular. */
export function ExerciseGuideDialog({
  title, subtitle, media, stats, instruction, onClose, credit,
}: Props) {
  const headingId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusables = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      ));
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [onClose]);

  return createPortal(
    <div className="guide-backdrop" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section
        ref={dialogRef}
        className="guide-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        aria-describedby={descriptionId}
      >
        <header className="guide-heading">
          <div>
            <span>DEMONSTRAÇÃO DO EXERCÍCIO</span>
            <h2 id={headingId}>{title}</h2>
            <p>{subtitle}</p>
          </div>
          <button className="guide-close" ref={closeRef} type="button" aria-label="Fechar demonstração" onClick={onClose}><X size={22} /></button>
        </header>
        <div className="guide-visual">{media}</div>
        <div className="guide-stats">
          {stats.map(({ label, value }) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}
        </div>
        <div className="guide-instructions" id={descriptionId}>
          <strong>Como fazer</strong>
          <p>{instruction}</p>
        </div>
        {credit && <small className="guide-credit">{credit}</small>}
        <button className="guide-back" type="button" onClick={onClose}>Voltar ao treino</button>
      </section>
    </div>,
    document.body,
  );
}
