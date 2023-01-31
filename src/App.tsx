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
                  <li>
                    <strong>Nome da loja: </strong>
                    <span>{store_name}</span>
                  </li>
                  <li>
                    <strong>Nome do dono da loja: </strong>
                    <span>{owner_name}</span>
                  </li>
                  <li>
                    <strong>Tipo da transação: </strong>
                    <span>{type}</span>
                  </li>
                  <li>
                    <strong>Valor da transação: </strong>
                    <span>
                      {type == "Boleto" ||
                      type == "Financiamento" ||
                      type == "Aluguel"
                        ? "- R$"
                        : "+ R$"}
                      {value.replace(".", ",")}
                    </span>
                  </li>
                  <li>
                    <strong>Data da transação: </strong>
                    <span>{date}</span>
                  </li>
                  <li>
                    <strong>Hora da transação: </strong>
                    <span>{hour}</span>
                  </li>
                  <li>
                    <strong>Cartão utilizado: </strong>
                    <span>{credit_card}</span>
                  </li>
                  <li>
                    <strong>CPF utilizado: </strong>
                    <span>{cpf}</span>
                  </li>
                </ul>
              )
            )
          : ""}
      </main>
    </>
  );
}

export default App;
