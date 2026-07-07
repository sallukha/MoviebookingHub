 import { Home, User, Ticket, LogOut, Bell, ShieldCheck } from 'lucide-react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

interface Notification {
  read?: boolean;
}

interface UserType {
  name?: string;
  role?: string;
}

interface SidebarProps {
  user?: UserType;
  onLogout: () => void;
  notifications?: Notification[];
}

export function Sidebar({ user, onLogout, notifications }: SidebarProps) {
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

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="hidden lg:block w-64 bg-white/10 backdrop-blur-md border-r border-white/20 h-screen fixed left-0 top-0 p-6 flex flex-col">
      
      <div className="mb-8">
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
            {item.badge && item.badge > 0 && (
              <Badge className="ml-auto bg-red-500">{item.badge}</Badge>
            )}
          </button>
        ))}
      </nav>

      <button
        onClick={() => {
          onLogout();
          navigate('/login');
        }}
        className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-white/20 rounded-lg transition-colors mt-auto"
      >
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </div>
  );
}
