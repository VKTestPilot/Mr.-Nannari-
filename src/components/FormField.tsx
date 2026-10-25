import { useId } from "react";

type Props = {
  label: string;
  name: string;
  error?: string;
  as?: "input" | "textarea" | "select";
  type?: string;
  options?: readonly string[];
  autoComplete?: string;
};

export function FormField({ label, name, error, as = "input", type = "text", options, autoComplete }: Props) {
  const id = useId();
  const errId = `${id}-err`;
  const common = {
    id,
    name,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errId : undefined,
    autoComplete,
  } as const;

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {as === "textarea" ? (
        <textarea {...common} rows={4} />
      ) : as === "select" ? (
        <select {...common} defaultValue="">
          <option value="" disabled>Select…</option>
          {options?.map((o) => <option key={o}>{o}</option>)}
        </select>
      ) : (
        <input {...common} type={type} />
      )}
      {error && <p id={errId} className="err" role="alert">{error}</p>}
    </div>
  );
}
