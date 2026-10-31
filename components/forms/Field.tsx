import { cn } from "@/lib/utils";

/** Labelled form field; error text is linked to the input via aria-describedby. */
type FieldProps = {
  id: string;
  name: string;
  label: string;
  as?: "input" | "textarea" | "select";
  type?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  placeholder?: string;
  options?: string[];
  error?: string;
  required?: boolean;
  className?: string;
};

export function Field({
  id,
  name,
  label,
  as = "input",
  type = "text",
  autoComplete,
  inputMode,
  placeholder,
  options = [],
  error,
  required,
  className,
}: FieldProps) {
  const errorId = `${id}-error`;
  const common = {
    id,
    name,
    autoComplete,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    "aria-required": required || undefined,
  };

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-medium text-title">
        {label}
        {required && (
          <span aria-hidden="true" className="text-lime">
            {" "}
            *
          </span>
        )}
      </label>

      {as === "textarea" && (
        <textarea {...common} rows={3} placeholder={placeholder} className="field-input min-h-[96px] resize-y" />
      )}

      {as === "select" && (
        <select {...common} defaultValue="" className="field-input">
          <option value="" disabled>
            {placeholder ?? "Select…"}
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      )}

      {as === "input" && (
        <input {...common} type={type} inputMode={inputMode} placeholder={placeholder} className="field-input" />
      )}

      {error && (
        <p id={errorId} className="text-sm text-bad">
          {error}
        </p>
      )}
    </div>
  );
}

/** Hidden honeypot field — real people never fill it, bots do. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor="hp-company-site">Leave this field empty</label>
      <input id="hp-company-site" name="company_site" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}
