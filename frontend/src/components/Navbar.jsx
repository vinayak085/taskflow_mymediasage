import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className='bg-gray-800 text-white px-4 sm:px-6 py-3 sm:py-4 shadow-md sticky top-0 z-50'>
      <Link to='/' className='text-lg sm:text-xl font-bold'>
        Project Manager 🚀
      </Link>
    </div>
  );
}
