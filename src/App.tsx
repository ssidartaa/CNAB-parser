import { useContext } from "react";
import { TextContext } from "./contexts/TextContext";

function App() {
  const {
    formattText,
    fileText,
    setFileText,
    parsedCNAB,
    showParsedCNABs,
    showCNAB,
  } = useContext(TextContext);

  const handleLoadFile = (e: any) => {
    const text = e.target.files[0];

    if (text) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setFileText(e.target!.result);
      };

      reader.readAsText(text);
    }
  };

  const handleReadedText = (e: any) => {
    e.preventDefault();
    if (fileText) {
      const textStr = fileText as string;

      const arrayText = textStr.match(/.{1,81}/g);

      formattText(arrayText!);
      e.target[0].value = "";
    }
  };

  return (
    <>
      <aside>
        <form onSubmit={handleReadedText}>
          <input type="file" onChange={handleLoadFile} accept=".txt" />
          <button type="submit">Enviar</button>
        </form>
      </aside>
      <main>
        <button onClick={showParsedCNABs}>
          {showCNAB ? "Esconder lista de CNAB's" : "Mostrar lista de CNAB's"}
        </button>

        {parsedCNAB.length && showCNAB
          ? parsedCNAB.map(
              ({
                id,
                type,
                date,
                value,
                cpf,
                credit_card,
                hour,
                owner_name,
                store_name,
              }) => (
                <ul key={id}>
                  <li>{type}</li>
                  <li>{date}</li>
                  <li>
                    {type == "Boleto" ||
                    type == "Financiamento" ||
                    type == "Aluguel"
                      ? "- "
                      : "+ "}
                    {value}
                  </li>
                  <li>{cpf}</li>
                  <li>{credit_card}</li>
                  <li>{hour}</li>
                  <li>{owner_name}</li>
                  <li>{store_name}</li>
                </ul>
              )
            )
          : ""}
      </main>
    </>
  );
}

export default App;
