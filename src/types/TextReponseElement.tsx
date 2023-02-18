import { TextInputElement } from "types/TextInputElement";

export type TextReponseElement = <Element extends TextInputElement = TextInputElement>(
    element: Element | null,
  ) => void;