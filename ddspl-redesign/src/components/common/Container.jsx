export default function Container({ children, className = "" }) {
  return (
    <div
      className={`mx-auto w-full max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16 ${className}`}
    >
      {children}
    </div>
  );
}