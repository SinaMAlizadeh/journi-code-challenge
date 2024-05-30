import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  resultsRef: React.RefObject<HTMLDivElement>;
}

function ResultContainer({ resultsRef, children }: Props) {
  return (
    <div
      ref={resultsRef}
      className="absolute border mt-1 rounded-md bg-white w-full max-h-60 overflow-y-auto z-10"
    >
      {children}
    </div>
  )
}

export default ResultContainer