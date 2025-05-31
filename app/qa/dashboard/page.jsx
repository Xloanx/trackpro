'use client'
import { useState } from "react";
import { QAOrganizationSwitcher } from "../components/qaOrganizationSwitcher";
import QAOverview from "../components/qaOverview";
import QAOrganizationPage from "../components/qaOrganization";
import QATeamPage from "../components/qaTeam";
import QaTeamManagementPage from "../components/qaTeamManagement";
import QATicketsPage from "../components/qaTickets";
import QaKnowledgeBasePage from "../components/qakb";
import QAReportsPage from "../components/qaReports";
import QaSubscriptionPage from "../components/qaSubscription";
import PaymentMethodsPage from "../../payment-methods/page";
import CouponRedemptionPage from "../../coupon-redemption/page";
import SettingsPage from "../../settings/page";
import { Button } from "@/components/ui/button";
import { 
  Zap,
  Menu,
  Bell,
  Settings,
  LogOut,
  BarChart3,
  FileText,
  Users,
  TicketIcon,
  Building,
  Library,
  CreditCard
} from "lucide-react";
import Link from "next/link";
import { useOrganization } from "@/hooks/useOrganization";

const QADashboardPage = () => {
  const [userRole] = useState('qa_personnel');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentUI, setCurrentUI] = useState('Overview')
  const { currentOrganization, selectOrganization } = useOrganization();

  console.log(currentOrganization);

  const handleTeamManagementUI = () =>{
    setCurrentUI('Team Management')
  }
 
  const handlePaymentMethods = () =>{
    setCurrentUI('Payment Methods')
  }

  const handleCouponRedemption = () =>{
    setCurrentUI('Coupon Redemption')
  }

  const handleOrganizationChange = (currentOrganization) => {
  // In a real app, this would fetch the organization data
  setCurrentOrganization(currentOrganization);
  console.log('Switching to organization:', currentOrganization);
  // Mock organization switch - in real app, update currentOrganization state with fetched data
  };

  const navigationItems = [
    { name: 'Overview', component: <QAOverview userRole={userRole} 
                                                organizationName={currentOrganization?.name || 
                                                                  'Unknown Organization'}/>, 
                                                icon: Settings},
    { name: 'Organization', component: <QAOrganizationPage />, icon: Building},
    { name: 'Team', component: <QATeamPage onManageTeam={handleTeamManagementUI}/>, icon: Users},
      { name: 'Team Management', component: <QaTeamManagementPage />, icon: Users, nav: "hidden"},
    { name: 'Tickets', component: <QATicketsPage />, icon: TicketIcon},
    { name: 'Knowledge Base', component: <QaKnowledgeBasePage />, icon: Library  },
    { name: 'Reports', component: <QAReportsPage />, icon: FileText},
    { name: 'Subscription', component: <QaSubscriptionPage onPaymentMethods = {handlePaymentMethods}
                                                            onCouponRedemption = {handleCouponRedemption}

                                        />, icon: CreditCard},
      { name: 'Payment Methods', component: <PaymentMethodsPage />, icon: CreditCard, nav: "hidden"},
      { name: 'Coupon Redemption', component: <CouponRedemptionPage />, icon: CreditCard, nav: "hidden"},
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
                  TrackPro
                </span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <QAOrganizationSwitcher 
                currentOrganization={currentOrganization}
                onOrganizationChange={selectOrganization}
              />
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
          <div className="w-64 bg-white shadow-sm min-h-screen">
            <nav className="mt-8 px-4">
              <ul className="space-y-2">
                {navigationItems.map((item) => 
                  // (item.current !== false || userRole === 'admin') && (
                  (item.nav !== "hidden") && (
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
                  )
                )}
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

export default QADashboardPage;
