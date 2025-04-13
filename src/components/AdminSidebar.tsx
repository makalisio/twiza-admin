import React from 'react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarGroup,
  SidebarGroupContent
} from '@/components/ui/sidebar';
import { useTranslation } from '@/utils/i18n';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Flag, Settings, LogOut, Heart, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { authService } from '@/services/auth.service';
import { toast } from 'sonner';

export const AdminSidebar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { 
      path: '/admin/dashboard', 
      label: t('dashboard'), 
      icon: LayoutDashboard 
    },
    { 
      path: '/campaigns', 
      label: t('campaigns'), 
      icon: Flag 
    },
    { 
      path: '/users', 
      label: t('users'), 
      icon: Users 
    },
    { 
      path: '/settings', 
      label: t('settings'), 
      icon: Settings 
    }
  ];

  const handleLogout = async () => {
    try {
      await authService.logout();
      toast.success('Déconnexion réussie');
      navigate('/admin/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      toast.error('Une erreur est survenue lors de la déconnexion');
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 right-4 z-50 md:hidden"
        onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'b', ctrlKey: true }))}
      >
        <Menu className="h-6 w-6" />
      </Button>
      <Sidebar>
        <SidebarHeader className="p-4 flex items-center gap-2">
          <Heart className="w-10 h-10 text-primary" strokeWidth={1.5} />
          <div className="font-bold text-xl">Twiza Admin</div>
        </SidebarHeader>
        
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild isActive={location.pathname === item.path}>
                      <Link to={item.path} className="flex items-center gap-3">
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        
        <SidebarFooter className="p-4 border-t border-border">
          <div className="flex justify-between items-center">
            <LanguageSwitcher />
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-red-500 hover:text-red-700 flex items-center gap-2"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              <span>{t('logout')}</span>
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
    </>
  );
};
