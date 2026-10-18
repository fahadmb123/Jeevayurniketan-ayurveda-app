import React, { useCallback } from 'react';
import { Menu, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from '@/shared/ui/ThemeToggle';
import { useAuth } from '@/features/auth';
import { ROUTES } from '@/shared/config/routes';
import './DoctorHeader.css';

export interface DoctorHeaderProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

export const DoctorHeader: React.FC<DoctorHeaderProps> = React.memo(({
  isSidebarOpen,
  onToggleSidebar,
}) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = useCallback(async () => {
    try {
      await logout();
    } finally {
      navigate(ROUTES.LOGIN);
    }
  }, [logout, navigate]);

  return (
    <header className="doctor-header">
      <div className="doctor-header__left">
        {!isSidebarOpen && (
          <button
            className="doctor-header__mobile-menu-btn"
            onClick={onToggleSidebar}
            aria-label="Toggle Navigation"
          >
            <Menu size={20} />
          </button>
        )}
      </div>
      <div className="doctor-header__actions">
        <ThemeToggle />
        <button
          type="button"
          className="doctor-header__logout-btn"
          onClick={handleLogout}
          title="Log out of doctor portal"
          aria-label="Log out"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </header>
  );
});

DoctorHeader.displayName = 'DoctorHeader';
