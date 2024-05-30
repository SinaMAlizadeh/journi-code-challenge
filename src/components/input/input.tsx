import { forwardRef } from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(({ ...props }, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className="w-full rounded-md border-gray-300 focus:border-blue-300 focus:border-2 border-solid"
    />
  );
});

export default Input;