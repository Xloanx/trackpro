
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TicketIcon, 
  Users, 
  Clock, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  BarChart3,
  Plus
} from "lucide-react";



// interface DashboardProps {
//   userRole: 'admin' | 'qa_personnel' | 'support_staff';
//   organizationName?: string;
// }

const Dashboard = ({ userRole, organizationName = "Your Organization" }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - will be replaced with real data from Supabase
  const stats = {
    totalTickets: 156,
    pendingTickets: 23,
    inProgressTickets: 45,
    resolvedTickets: 88,
    avgResolutionTime: "2.5 hours",
    customerSatisfaction: "94%"
  };

  const recentTickets = [
    {
      id: "TK-001",
      title: "Payment processing issue",
      priority: "high",
      status: "pending",
      assignee: "John Doe",
      createdAt: "2 hours ago"
    },
    {
      id: "TK-002", 
      title: "Account access problem",
      priority: "medium",
      status: "in_progress",
      assignee: "Jane Smith",
      createdAt: "4 hours ago"
    },
    {
      id: "TK-003",
      title: "Feature request feedback",
      priority: "low",
      status: "resolved",
      assignee: "Mike Johnson",
      createdAt: "1 day ago"
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {userRole === 'admin' ? 'Admin Dashboard' : 
             userRole === 'qa_personnel' ? `${organizationName} - QA Dashboard` :
             'Support Dashboard'}
          </h1>
          <p className="text-gray-600 mt-1">
            {userRole === 'admin' ? 'Manage all organizations and subscriptions' :
             userRole === 'qa_personnel' ? 'Monitor and manage your organization tickets' :
             'View and resolve assigned tickets'}
          </p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
          <Plus className="w-4 h-4 mr-2" />
          {userRole === 'support_staff' ? 'Create Ticket' : 'New Assignment'}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
            <TicketIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTickets}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{stats.pendingTickets}</div>
            <p className="text-xs text-muted-foreground">
              Needs immediate attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.inProgressTickets}</div>
            <p className="text-xs text-muted-foreground">
              Being actively worked on
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.resolvedTickets}</div>
            <p className="text-xs text-muted-foreground">
              Successfully completed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Avg Resolution Time</span>
              <Badge variant="secondary">{stats.avgResolutionTime}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Customer Satisfaction</span>
              <Badge className="bg-green-100 text-green-800">{stats.customerSatisfaction}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">First Response Time</span>
              <Badge variant="secondary">15 minutes</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Team Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-blue-600">JD</span>
                  </div>
                  <span className="text-sm font-medium">John Doe</span>
                </div>
                <Badge className="bg-green-100 text-green-800">15 resolved</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-purple-600">JS</span>
                  </div>
                  <span className="text-sm font-medium">Jane Smith</span>
                </div>
                <Badge className="bg-green-100 text-green-800">12 resolved</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-orange-600">MJ</span>
                  </div>
                  <span className="text-sm font-medium">Mike Johnson</span>
                </div>
                <Badge className="bg-green-100 text-green-800">8 resolved</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Tickets */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Tickets</CardTitle>
          <CardDescription>Latest customer service requests and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTickets.map((ticket) => (
              <div key={ticket.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="font-medium text-gray-900">{ticket.id}</span>
                    <Badge className={getPriorityColor(ticket.priority)}>
                      {ticket.priority}
                    </Badge>
                    <Badge className={getStatusColor(ticket.status)}>
                      {ticket.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">{ticket.title}</h4>
                  <p className="text-sm text-gray-600">
                    Assigned to {ticket.assignee} • {ticket.createdAt}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
