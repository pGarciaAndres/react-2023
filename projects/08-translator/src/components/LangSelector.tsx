import { Form } from "react-bootstrap";
import { AUTO_LANG, SUPPORTED_LANG } from "../const";
import { FromLang, Language, SectionType } from "../types.d";

type Props =
  | {
      type: SectionType.From;
      value: FromLang;
      onChange: (lang: FromLang) => void;
    }
  | {
      type: SectionType.To;
      value: Language;
      onChange: (lang: Language) => void;
    };

export const LangSelector = ({ type, value, onChange }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language);
  };

  return (
    <Form.Select
      aria-label="Select language"
      onChange={handleChange}
      value={value}
    >
      {type === SectionType.From && (
        <option value={AUTO_LANG}>Detectar idioma</option>
      )}
      {Object.entries(SUPPORTED_LANG).map(([key, lang]) => (
        <option key={key} value={key}>
          {lang}
        </option>
      ))}
    </Form.Select>
  );
};
