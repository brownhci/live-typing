import { useCallback, useEffect, useState, useRef } from 'react';

import { TypingProps } from 'props/TypingProps';
import { TextInputElement } from 'types/TextInputElement';
import { TextReponseElement } from 'types/TextReponseElement';

const enum Indicators {
  noIndicator = 1,
  isTyping = 2,
  liveTyping = 3,
  maskedTyping = 4,
}

export function typingIndicator({
  timeout = 5000,
  indicatorType = Indicators.isTyping,
}: TypingProps = {}): [boolean, string, TextReponseElement] {
  const visibilityTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const [currentElement, setCurrentElement] = useState<TextInputElement | null>(
    null,
  );
  const [isTyping, setIsTyping] = useState(false);
  const [typedCharacter, setTypedCharacter] = useState('');

  // Declare helper functions
  // Type Indication Helpers
  const resetTyping = function(): void {
    setIsTyping(false);
    setTypedCharacter('');
  };
  const setTypingValue = function(
    typingStatus: boolean,
    typedCharacter: string,
  ): void {
    setIsTyping(typingStatus);
    setTypedCharacter(typedCharacter);
  };

  // Reset Helpers
  const resetCaller = function(): void {
    {
      if (visibilityTimeoutRef.current) {
        clearTimeout(visibilityTimeoutRef.current);
      }
      visibilityTimeoutRef.current = setTimeout(resetTyping, timeout);
    }
  };
  const elementReset = function(element: TextInputElement | null): void {
    setCurrentElement(element);
    if (!element) {
      resetTyping();
    }
  };
  const timeoutReset = function(): void {
    if (visibilityTimeoutRef.current) {
      clearTimeout(visibilityTimeoutRef.current);
    }
  };

  // Binding events and callbacks
  const resetTypingIndicator = useCallback(() => resetCaller, [timeout]);
  const responseElement: TextReponseElement = useCallback(
    element => elementReset(element),
    [],
  );
  useEffect(() => {
    return () => timeoutReset();
  }, []);

  useEffect(() => {
    resetTyping();
    if (!currentElement) {
      return;
    }

    const keyPressListener = (event: Event) => {
      const isTyping = (event.target as TextInputElement).value !== '';
      const typedCharacterValue = (event.target as TextInputElement).value;
      switch (+indicatorType) {
        case Indicators.noIndicator:
          setTypingValue(false, '');
          break;
        case Indicators.isTyping:
          setTypingValue(isTyping, '...');
          break;
        case Indicators.liveTyping:
          setTypingValue(isTyping, typedCharacterValue);
          break;
        case Indicators.maskedTyping:
          setTypingValue(isTyping, '#'.repeat(typedCharacterValue.length));
          break;
        default:
          setTypingValue(isTyping, '...');
          break;
      }
      resetTypingIndicator();
    };
    const blurListener = () => {
      timeoutReset();
      resetTyping();
    };

    currentElement.addEventListener('input', keyPressListener);
    currentElement.addEventListener('blur', blurListener);

    return () => {
      currentElement.removeEventListener('input', keyPressListener);
      currentElement.removeEventListener('blur', blurListener);
    };
  }, [currentElement, resetTypingIndicator]);

  return [isTyping, typedCharacter, responseElement];
}

export default typingIndicator;
