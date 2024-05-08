
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className='bg-red-100 p-3 md:p-5'>
      <div className='flex items-center justify-between'>
        <h3 className='text-2xl md:text-3xl font-bold ml-3 md:ml-12'>RepoExplorer</h3>
        <div className="flex items-center md:space-x-4">
          <Link to="/" className="text-gray-700 hover:text-gray-900">Git Trends</Link>
          <Link to="/gitprofile" className="text-gray-700 hover:text-gray-900">Git Profile</Link>
        </div>
      </div>
    </div>
  );
}
