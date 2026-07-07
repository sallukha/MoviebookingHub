 import { useState } from 'react';
import { Home, User, Ticket, LogOut, Bell, ShieldCheck, Menu, X } from 'lucide-react';
import { Badge } from './ui/badge';
import { To, useNavigate } from 'react-router-dom';

interface MobileSidebarProps {
  user?: { name?: string; role?: string } | null;
  onLogout: () => void;
  notifications?: { read: boolean }[];
}

export function MobileSidebar({ user, onLogout, notifications }: MobileSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const unreadCount = notifications?.filter(n => !n.read).length || 0;

  const menuItems = [
    { id: '/home', label: 'Home', icon: Home },
    { id: '/dashboard', label: 'My Bookings', icon: Ticket },
    { id: '/notifications', label: 'Notifications', icon: Bell, badge: unreadCount },
    { id: '/profile', label: 'Profile', icon: User },
  ];

  if (user?.role === 'admin') {
    menuItems.push({ id: '/admin', label: 'Admin Panel', icon: ShieldCheck });
  }

  const handleNavigate = (path: To) => {
    navigate(path); // ✅ React Router navigation
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-lg"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`
        lg:hidden fixed top-0 left-0 h-full w-72 bg-slate-900/95 backdrop-blur-md border-r border-white/20 z-40 p-6 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="mb-8 mt-16">
          <h2 className="text-white text-xl">Bookify Cinema</h2>
          <p className="text-gray-300 text-sm mt-1">{user?.name}</p>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.id)}
              className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-white/20 rounded-lg transition-colors relative"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
              {(item.badge ?? 0) > 0 && (
                <Badge className="ml-auto bg-red-500">{item.badge}</Badge>
              )}
            </button>
          ))}
        </nav>

        <button
          onClick={() => {
            onLogout();
            setIsOpen(false);
            navigate('/login'); // ✅ Redirect after logout
          }}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-white/20 rounded-lg transition-colors mt-auto"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </>
  );
}
