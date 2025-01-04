function CategoriesHeading({ title }) {
  return (
    <>
      <div className={` flex items-center justify-between gap-4 `}>
        <h1 className={` `}>{title}</h1>
        <div className="w-[60%] h-[2px] bg-gray-300"></div>
      </div>
    </>
  );
}

export default CategoriesHeading;
