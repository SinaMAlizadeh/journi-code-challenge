import React from 'react'

type Props = {
   title: string,
   value?: string
}

function DetailsItem({title ,value} :Props) {
  return (
      <div className="flex justify-between">
        <span className="font-normal text-gray-500 dark:text-gray-400">{title}</span>
        <span className="font-normal text-gray-500 dark:text-gray-400">{value || "-"}</span>
      </div>
  )
}

export default DetailsItem