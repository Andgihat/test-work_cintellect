import { TextFieldVM } from "./vm/TextFieldVM";
import { TextInput } from "./components/TextInput";

const vm1 = new TextFieldVM();
const vm2 = new TextFieldVM();

export default function App() {
  return (
    <div style={{ padding: 16, maxWidth: 600 }}>
      <h2>Тест 1: две кнопки справа</h2>
      <TextInput
        vm={vm1}
        rightButtons={[
          { label: "Clear", onClick: vm1.clear },
            { label: "Hello", onClick: vm1.setHello, kind: "primary" },
        ]}
        placeholder="Введите что-нибудь..."
      />

      <h2>Тест 2: одна слева / одна справа</h2>
      <TextInput
        vm={vm2}
        leftButtons={[
          { label: "Alert", onClick: vm2.alertValue, kind: "secondary" },
        ]}
        rightButtons={[
          { label: "Validate", onClick: vm2.validateNumber, kind: "primary" },
        ]}
        placeholder="Число или текст"
      />
    </div>
  );
}
