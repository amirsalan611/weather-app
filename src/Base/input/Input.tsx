interface InputProps {
  type: string;
  LabelContent: string;
  forId: string;
  onchange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  value: string;
}
export default function Input({
  type,
  LabelContent,
  forId,
  onchange,
  error,
  value,
}: InputProps) {
  return (
    <form>
      <div className="w-60 h-12 relative flex rounded-xl">
        <input
          required
          className="peer w-full bg-transparent outline-none font-thin text-sm px-4 text-base rounded-xl bg-white border border-[#5c87ff] focus:shadow-md"
          onChange={onchange}
          value={value}
          id={forId}
          type={type}
        />
        <label
          className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
          htmlFor={forId}
        >
          {LabelContent}
        </label>
      </div>
      {/* {error && (
        <p className="font-thin text-red-600">Please fill out all fields.</p>
      )} */}
    </form>
  );
}
