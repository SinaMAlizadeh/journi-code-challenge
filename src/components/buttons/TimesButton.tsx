import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>

function TimesButton({ ...props }: Props) {
  return (
    <button
      {...props}
      className="focus:outline-none text-lg text-gray-400"
      aria-label="Clear search"
    >
      &times;
    </button>
  )
}

export default TimesButton