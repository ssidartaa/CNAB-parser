import { Dispatch, ReactNode, SetStateAction } from "react";

interface ITextContextValues {
  formattText: (data: RegExpMatchArray) => void;
  fileText: string | ArrayBuffer | null;
  setFileText: Dispatch<SetStateAction<string | ArrayBuffer | null>>;
  parsedCNAB: ICNAB[];
  showParsedCNABs: () => void;
  showCNAB: boolean;
}

interface ICNAB {
  id?: string;
  type: string;
  date: string;
  value: string;
  cpf: string;
  credit_card: string;
  hour: string;
  owner_name: string;
  store_name: string;
}

interface ITextProviderProps {
  children: ReactNode;
}
