import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import api from "../services/api";

import { ICNAB, ITextContextValues, ITextProviderProps } from "./interfaces";

export const TextContext = createContext<ITextContextValues>(
  {} as ITextContextValues
);

export const TextProvider = ({ children }: ITextProviderProps) => {
  const [fileText, setFileText] = useState<string | null | ArrayBuffer>("");

  const [parsedCNAB, setParsedCNAB] = useState<ICNAB[]>([]);
  const [showCNAB, setShowCNAB] = useState<boolean>(false);

  const formattText = (data: RegExpMatchArray) => {
    setFileText(null);
    let formattedCNAB = {} as ICNAB;
    data.forEach((str) => {
      formattedCNAB = {
        type: str.slice(0, 1),
        date: str.slice(1, 9),
        value: str.slice(9, 19),
        cpf: str.slice(19, 30),
        credit_card: str.slice(30, 42),
        hour: str.slice(42, 48),
        owner_name: str.slice(48, 62).trim(),
        store_name: str.slice(62, 80).trim(),
      };

      parseCNABText(formattedCNAB);
    });
  };

  const parseCNABText = (CNAB: ICNAB) => {
    api
      .post<ICNAB[]>("transactions/", CNAB)
      .then(({ data }) => {
        const arrData = data as ICNAB[];
        setParsedCNAB(arrData);
        toast.success("Arquivo parseado, dados sendo guardados na API", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          toastId: 1,
        });
      })
      .catch((err) => {
        toast.error("Ocorreu algum erro. Tente novamente.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          toastId: 1,
        });
        console.log(err);
      });
  };

  useEffect(() => {
    api
      .get<ICNAB[]>("transactions/")
      .then(({ data }) => setParsedCNAB(data))
      .catch((err) => {
        toast.error("Ocorreu algum erro. Tente novamente.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          toastId: 1,
        });
        console.log(err);
      });
  }, [parsedCNAB]);

  const showParsedCNABs = () => {
    if (!showCNAB) {
      api
        .get<ICNAB[]>("transactions/")
        .then(({ data }) => setParsedCNAB(data))
        .catch((err) => {
          toast.error("Ocorreu algum erro. Tente novamente.", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            toastId: 1,
          });
          console.log(err);
        })
        .finally(() => setShowCNAB(true));
    }
    setShowCNAB(false);
  };

  return (
    <TextContext.Provider
      value={{
        formattText,
        fileText,
        setFileText,
        parsedCNAB,
        showParsedCNABs,
        showCNAB,
      }}
    >
      {children}
    </TextContext.Provider>
  );
};

export default TextProvider;
