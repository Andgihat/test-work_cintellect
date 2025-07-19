import { TextFieldVM } from "./vm/TextFieldVM";
import { TextInput } from "./components/TextInput";
import { Autocomplete } from "./components/Autocomplete";

const vmPlain1 = new TextFieldVM();
const vmPlain2 = new TextFieldVM();
const vmAcSmall = new TextFieldVM();
const vmAcLarge = new TextFieldVM();

export default function App() {
  return (
    <div style={{ padding: 24, maxWidth: 720, fontFamily: "sans-serif" }}>
      <h1 style={{ marginTop: 0 }}>Тестовое демо</h1>

      <section>
        <h2>Базовые конфигурации TextInput</h2>

        <h3>1. Две кнопки справа</h3>
        <TextInput
          vm={vmPlain1}
          rightButtons={[
            { label: "Clear", onClick: vmPlain1.clear },
            { label: "Hello", onClick: vmPlain1.setHello, kind: "primary" },
          ]}
          placeholder="Введите текст..."
        />

        <h3>2. Одна слева + одна справа</h3>
        <TextInput
          vm={vmPlain2}
          leftButtons={[
            { label: "Validate", onClick: vmPlain2.validateNumber, kind: "primary" },
          ]}
          rightButtons={[
            { label: "Alert", onClick: vmPlain2.alertValue },
          ]}
          placeholder="Введите число..."
        />
      </section>

      <section style={{ marginTop: 40 }}>
        <h2>Автокомплит стран</h2>

        <h3>max = 3</h3>
        <Autocomplete
          vm={vmAcSmall}
            max={3}
          placeholder="Страна (до 3 подсказок)"
        />

        <h3 style={{ marginTop: 24 }}>max = 10</h3>
        <Autocomplete
          vm={vmAcLarge}
          max={10}
          placeholder="Страна (до 10 подсказок)"
        />
      </section>
    </div>
  );
}
