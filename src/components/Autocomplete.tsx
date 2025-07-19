import React, { useEffect, useMemo, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { TextFieldVM } from "../vm/TextFieldVM";
import { TextInput, ControlButton } from "./TextInput";
import countriesData from "../api/countries.json";

export interface Country {
  name: string;
  fullName: string;
  flag: string;
}

function filterCountries(query: string): Country[] {
  if (!query.trim()) return [];
  const q = query.trim().toLowerCase();

  const raw = (countriesData as Country[]).filter(c =>
    c.name.toLowerCase().includes(q) || c.fullName.toLowerCase().includes(q)
  );

  const seen = new Set<string>();
  const dedup: Country[] = [];
  for (const c of raw) {
    const key = c.name.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      dedup.push(c);
    }
  }
  return dedup;
}

interface AutocompleteProps {
  vm: TextFieldVM;
  max: number;
  placeholder?: string;
  debounceMs?: number;
  className?: string;
}

export const Autocomplete: React.FC<AutocompleteProps> = observer(
  ({ vm, max, placeholder, debounceMs = 300, className = "" }) => {
    const [suggestions, setSuggestions] = useState<Country[]>([]);
    const [open, setOpen] = useState(false);
    const timerRef = useRef<number | null>(null);

    const rightButtons: ControlButton[] = useMemo(
      () => [
        {
          label: "Clear",
          onClick: () => {
            vm.clear();
            setSuggestions([]);
            setOpen(false);
          },
          kind: "secondary",
        },
      ],
      [vm]
    );

    useEffect(() => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        const list = filterCountries(vm.value).slice(0, max);
        setSuggestions(list);
        setOpen(list.length > 0);
      }, debounceMs) as unknown as number;
      return () => {
        if (timerRef.current) window.clearTimeout(timerRef.current);
      };
    }, [vm.value, max, debounceMs]);

    const handleSelect = (c: Country) => {
      vm.setValue(c.name);
      setOpen(false);
    };

    return (
      <div className={`ac-root ${className}`.trim()}>
        <TextInput vm={vm} rightButtons={rightButtons} placeholder={placeholder} />
        {open && suggestions.length > 0 && (
          <ul className="ac-list">
            {suggestions.map((c) => (
              <li
                key={c.name}
                className="ac-item"
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelect(c);
                }}
              >
                <span className="ac-flag">
                  {c.flag ? <img src={c.flag} alt={c.name} loading="lazy" /> : "🏳️"}
                </span>
                <span className="ac-names">
                  <span className="ac-common">{c.name}</span>
                  <span className="ac-official">{c.fullName}</span>
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);
