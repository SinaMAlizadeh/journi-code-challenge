import { RefObject } from "react";

type AutocompleteItemProps = {
  title: string;
  index: number;
  highlightedIndex: number;
  itemRefs: RefObject<(HTMLDivElement | null)[]>;
  onClick: () => void;
  onMouseEnter: () => void;
};

const AutoCompleteItem = ({
  title,
  index,
  highlightedIndex,
  itemRefs,
  onClick,
  onMouseEnter,
}: AutocompleteItemProps) => {
  return (
    <div
      key={index}
      ref={(el) => {
        if (itemRefs.current) {
          itemRefs.current[index] = el;
        }
      }}
      className={`cursor-pointer p-2 hover:bg-gray-200 ${index === highlightedIndex ? 'bg-gray-200' : ''}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      {title}
    </div>
  );
};
export default AutoCompleteItem;
