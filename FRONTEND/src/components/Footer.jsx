const Footer = () => {
  return (
    <div className="bg-yellow-100 text-amber-900 py-6 cursor-context-menu w-full">
      <div className="container mx-auto text-center">
        <p className="flex items-center justify-center">
          <span className="font-bold text-xl px-1">
            &copy; Mohd Kamran Khan{" "}
          </span>
          | {new Date().getFullYear()} All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
