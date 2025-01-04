function Button({ title, onclick }) {
  return (
    <>
      <button
        onClick={onclick}
        className=" text-[14px] px-3 py-2 rounded-lg md:py-4 md:px-8 bg-primarycolor text-white"
      >
        {title}
      </button>
    </>
  );
}

export default Button;
