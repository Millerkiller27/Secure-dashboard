import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { 
  Home, 
  ShieldAlert, 
  Users, 
  Bell, 
  Settings, 
  LogOut, 
  Menu,
  User,
  BarChart,
  Activity,
  X 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  // Navigation items
  const navItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: <Home className="h-5 w-5" />,
      adminOnly: false,
    },
    {
      name: "Security Events",
      path: "/security-events",
      icon: <ShieldAlert className="h-5 w-5" />,
      adminOnly: false,
    },
    {
      name: "Behavior Analysis",
      path: "/behavior-analysis",
      icon: <Activity className="h-5 w-5" />,
      adminOnly: false,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: <BarChart className="h-5 w-5" />,
      adminOnly: false,
    },
    {
      name: "Users",
      path: "/users",
      icon: <Users className="h-5 w-5" />,
      adminOnly: true,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <Settings className="h-5 w-5" />,
      adminOnly: false,
    },
  ];

  // Filter items by user role
  const filteredNavItems = navItems.filter(
    (item) => !item.adminOnly || user?.role === "admin"
  );

  return (
    <div className="flex h-screen bg-gray-950 text-white">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 border-r border-gray-800 bg-gray-900">
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="h-8 w-8 text-blue-500" />
            <h1 className="text-xl font-bold text-white">SecureDash</h1>
          </div>
        </div>
        <nav className="flex-1 pt-2">
          {filteredNavItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <a
                className={`flex items-center px-6 py-3 text-sm font-medium ${
                  location === item.path
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </a>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-800">
          {user && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarFallback className="bg-blue-600">
                    {user.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{user.username}</p>
                  <p className="text-xs text-gray-400 capitalize">{user.role}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                title="Logout"
              >
                <LogOut className="h-5 w-5 text-gray-400 hover:text-white" />
              </Button>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile navigation overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="h-full w-64 bg-gray-900 p-4">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-2">
                <ShieldAlert className="h-8 w-8 text-blue-500" />
                <h1 className="text-xl font-bold text-white">SecureDash</h1>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-5 w-5 text-gray-400" />
              </Button>
            </div>
            <nav className="space-y-1">
              {filteredNavItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <a
                    className={`flex items-center px-4 py-3 text-sm font-medium ${
                      location === item.path
                        ? "bg-blue-600 text-white"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.icon}
                    <span className="ml-3">{item.name}</span>
                  </a>
                </Link>
              ))}
            </nav>
            <Separator className="my-4 bg-gray-800" />
            {user && (
              <div className="flex items-center justify-between p-2">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarFallback className="bg-blue-600">
                      {user.username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{user.username}</p>
                    <p className="text-xs text-gray-400 capitalize">
                      {user.role}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  disabled={logoutMutation.isPending}
                  title="Logout"
                >
                  <LogOut className="h-5 w-5 text-gray-400 hover:text-white" />
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top navigation */}
        <header className="bg-gray-900 border-b border-gray-800">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-6 w-6 text-gray-300" />
              </Button>
              <h1 className="text-lg font-bold text-white ml-3">SecureDash</h1>
            </div>
            <div className="flex-1 md:flex-initial"></div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-gray-300" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5 text-gray-300" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-gray-900 border-gray-800 text-white">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-800" />
                  <DropdownMenuItem onClick={() => toast({ title: "Profile", description: "Profile clicked" })}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toast({ title: "Settings", description: "Settings clicked" })}>
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-800" />
                  <DropdownMenuItem onClick={handleLogout}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto bg-gray-950">
          <div className="container mx-auto py-6 px-4">{children}</div>
        </main>
      </div>
    </div>
  );
}