function CategoriesHeading({ title }) {
  return (
    <div className="flex items-center justify-between gap-4 p-4">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent animate-gradient relative hover:scale-105 transition-transform duration-300">
        {title}
      </h1>
      <div className="w-[60%] h-[2px] bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 animate-pulse"></div>
    </div>
  );
}

export default CategoriesHeading;
