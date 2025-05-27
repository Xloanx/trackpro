'use client'
import { useState } from "react";
import AdminDashboard from "./components/adminDashboard";
import AdminOrganizationsPage from "./components/adminOrganizations";
import AppUsersPage from "./components/appUsers";
import AppSubscriptionsPage from "./components/appSubscriptions";
import AdminSystemPage from "./components/adminSystem";
import SettingsPage from "../settings/page";
import TicketList from "./components/ticketList";
import { Button } from "@/components/ui/button";
import { 
  Zap,
  Menu,
  Bell,
  Settings,
  LogOut,
  BarChart3,
  Users,
  TicketIcon,
  Building,
  DollarSign,
  Shield
} from "lucide-react";
import Link from "next/link";

const AdminDashboardPage = () => {
  const [userRole] = useState('admin');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentUI, setCurrentUI] = useState("Dashboard")

  const navigationItems = [
    { name: 'Dashboard', component: <AdminDashboard userRole={userRole} />, icon: BarChart3},
    { name: 'Subscriptions', component: <AppSubscriptionsPage />, icon: DollarSign},
    { name: 'Organizations', component: <AdminOrganizationsPage />, icon: Building},
    { name: 'Users', component: <AppUsersPage />, icon: Users},
    { name: 'TicketList', component: <TicketList />, icon: TicketIcon},
    { name: 'System', component: <AdminSystemPage />, icon: Shield},
    { name: 'Settings', component: <SettingsPage />, icon: Settings},
    
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="mr-3"
              >
                <Menu className="w-5 h-5" />
              </Button>
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  TrackPro Admin
                </span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        {sidebarOpen && (
          <div className="w-64 bg-white shadow-sm min-h-screen sm:block hidden">
            <nav className="mt-8 px-4">
              <ul className="space-y-2">
                {navigationItems.map((item) => (
                  <li key={item.name}>
                    <Button
                        variant="ghost"
                        onClick={() => setCurrentUI(item.name)}
                        className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md 
                                    transition-colors cursor-pointer 
                                    ${currentUI === item.name
                                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                                    }`}
                        >
                        <item.icon className="mr-3 w-5 h-5" />
                        {item.name}
                    </Button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1">
            {navigationItems.find((item) => item.name === currentUI)?.component}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;


