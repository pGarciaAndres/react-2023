import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import reactLogo from "./assets/react.svg";
import { useLanguage } from "./hooks/useLanguage";
import { Container, Row, Col, Button, Stack } from "react-bootstrap";
import { AUTO_LANG } from "./const";
import { ArrowsIcon, CopyIcon } from "./components/Icons";
import { LangSelector } from "./components/LangSelector";
import { TextArea } from "./components/TextArea";
import { SectionType } from "./types.d";
import { useDebounce } from "./hooks/useDebounce";

function App() {
  const {
    fromLang,
    toLang,
    fromText,
    result,
    loading,
    interchangeLang,
    setFromLang,
    setToLang,
    setFromText,
    setResult,
  } = useLanguage();

  const debouncedFromText = useDebounce(fromText, 600);

  useEffect(() => {
    if (debouncedFromText === "") return;

    setResult(debouncedFromText);
    //API NEEDED
    // translate({ fromLanguage, toLanguage, text: debouncedFromText })
    //     .then(result => {
    //       if (result == null) return
    //       setResult(result)
    //     })
    //     .catch(() => { setResult('Error') })
  }, [debouncedFromText, fromLang, toLang]);

  const handleCopyText = () => {
    navigator.clipboard.writeText(result).catch(() => {});
  };

  return (
    <Container fluid>
      <h1 style={{ textAlign: "center" }}>
        React <img src={reactLogo} className="logo react" alt="React logo" />{" "}
        Translator
      </h1>

      <Row>
        <Col>
          <Stack gap={2}>
            <LangSelector
              type={SectionType.From}
              value={fromLang}
              onChange={setFromLang}
            />
            <TextArea
              type={SectionType.From}
              loading={loading}
              value={fromText}
              onChange={setFromText}
            />
          </Stack>
        </Col>
        <Col xs="auto">
          <Button
            variant="link"
            disabled={fromLang === AUTO_LANG}
            onClick={interchangeLang}
          >
            <ArrowsIcon />
          </Button>
        </Col>
        <Col>
          <Stack gap={2}>
            <LangSelector
              type={SectionType.To}
              value={toLang}
              onChange={setToLang}
            />
            <div style={{ position: "relative" }}>
              <TextArea
                type={SectionType.To}
                loading={loading}
                value={result}
                onChange={setResult}
              />
              <Button
                variant="link"
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  opacity: 0.5,
                }}
                onClick={handleCopyText}
              >
                <CopyIcon />
              </Button>
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
