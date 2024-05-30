import { useEffect } from "react";

type Props = {
  inputRef: React.RefObject<HTMLInputElement>;
  resultsRef: React.RefObject<HTMLDivElement>;
  setShowResults: React.Dispatch<React.SetStateAction<boolean>>;
}

function UseHandleClickOutSide({inputRef ,resultsRef, setShowResults} :Props) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node) && !resultsRef.current?.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [inputRef, resultsRef, setShowResults]);
  return null
}

export default UseHandleClickOutSide