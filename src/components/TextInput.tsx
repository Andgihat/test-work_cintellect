import React from "react";
import { observer } from "mobx-react-lite";
import { TextFieldVM } from "../vm/TextFieldVM";

export interface ControlButton {
  label: string;
  onClick: () => void;
  title?: string;
  disabled?: boolean;
  kind?: "primary" | "danger" | "secondary";
}

interface TextInputProps {
  vm: TextFieldVM;
  leftButtons?: ControlButton[];
  rightButtons?: ControlButton[];
  placeholder?: string;
  className?: string;
  onChangeExternal?: (value: string) => void;
}

export const TextInput: React.FC<TextInputProps> = observer(
  ({ vm, leftButtons = [], rightButtons = [], placeholder, className = "", onChangeExternal }) => {
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      vm.setValue(e.target.value);
      onChangeExternal?.(e.target.value);
    };

    return (
      <div className={`ti-root ${className}`.trim()}>
        {leftButtons.length > 0 && (
          <div className="ti-buttons ti-left">
            {leftButtons.map((b) => (
              <button
                key={b.label}
                type="button"
                className={`ti-btn ti-${b.kind || "secondary"}`}
                onClick={b.onClick}
                disabled={b.disabled}
                title={b.title}
              >
                {b.label}
              </button>
            ))}
          </div>
        )}
        <input
          className="ti-input"
          value={vm.value}
          onChange={handleChange}
          placeholder={placeholder}
        />
        {rightButtons.length > 0 && (
          <div className="ti-buttons ti-right">
            {rightButtons.map((b) => (
              <button
                key={b.label}
                type="button"
                className={`ti-btn ti-${b.kind || "secondary"}`}
                onClick={b.onClick}
                disabled={b.disabled}
                title={b.title}
              >
                {b.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
);
