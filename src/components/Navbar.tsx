const Navbar = () => {
  return (
    <nav className="h-20 bg-[#427FBE] w-full flex items-center px-20">
      <a href="/" className="text-white hover:brightness-75 text-3xl">
        <span className="font-helvetica font-extrabold">GitHub</span>{" "}
        <span className="font-sans font-light">Jobs</span>
      </a>
    </nav>
  );
};

export default Navbar;
