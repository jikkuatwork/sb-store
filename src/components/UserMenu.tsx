import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import { clsx } from 'clsx';

export function UserMenu() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logging out...');
  };

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 transition-all",
          isOpen ? "ring-2 ring-indigo-500 ring-offset-2" : "hover:border-gray-300"
        )}
      >
        <img
          src="https://images.unsplash.com/photo-1614917738359-417e4b948c6e?q=100&w=400"
          alt="User avatar"
          className="h-7 w-7 rounded-full object-cover"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-[calc(100%+0.5rem)] z-50 min-w-[12rem] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
          <div className="divide-y divide-gray-100">
            <button
              onClick={() => {
                navigate('/accounts');
                setIsOpen(false);
              }}
              className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-50"
            >
              <User className="h-4 w-4" />
              Account Settings
            </button>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}