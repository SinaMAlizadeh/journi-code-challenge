import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>

function TimesButton({ ...props }: Props) {
  return (
    <button
      {...props}
      className="absolute right-2 top-1.5 focus:outline-none text-lg text-gray-400"
      aria-label="Clear search"
    >
      &times;
    </button>
  )
}

export default TimesButton