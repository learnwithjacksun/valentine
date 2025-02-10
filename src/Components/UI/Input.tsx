const Input = ({ label, id, type, ...props }: InputProps) => {
  return (
    <>
      <div className="space-y-2">
        <label htmlFor={id} className="text-sm font-sans text-main">
          {label}
        </label>
        <input
          type={type}
          id={id}
          name={id}
          className="w-full text-sm border border-line focus:border-orange-500/50 focus:ring-4 focus:ring-primary rounded-md p-2 placeholder:text-sm placeholder:text-sub"
          {...props}
        />
      </div>

    </>
  );
};

export default Input;
