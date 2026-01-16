import { useEffect, useRef, useState, type ReactNode } from "react";

type Option = {
  id: number;
  label: string;
  value: string | number;
  [key: string]: unknown;
};

const Select = ({
  value,
  options,
  onChange,
  renderOption,
  renderSelected,
}: {
  value: { id: number; label: string; value: string | number } | null;
  options: Option[];
  onChange: (option: Option) => void;
  renderOption?: (option: Option) => ReactNode;
  renderSelected?: (option: Option) => ReactNode;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="select-wrapper" ref={ref}>
      <div className="select-box" onClick={() => setOpen((prev) => !prev)}>
        <div className="select-left">
          {value ? (
            renderSelected ? (
              renderSelected(value)
            ) : (
              <span>{value.label}</span>
            )
          ) : null}
        </div>

        <span className={`arrow ${open ? "open" : ""}`} />
      </div>

      {open && (
        <div className="dropdown">
          {options?.length
            ? options.map((opt) => (
                <div
                  key={opt.value}
                  className={`option ${
                    value?.value === opt.value ? "active" : ""
                  }`}
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                >
                  {renderOption ? renderOption(opt) : <span>{opt.label}</span>}
                </div>
              ))
            : null}
        </div>
      )}
    </div>
  );
};

export default Select;
