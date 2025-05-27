
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  TicketIcon, 
  Clock, 
  CheckCircle,
  AlertCircle,
  User,
  MessageSquare,
  Calendar
} from "lucide-react";

// interface SupportDashboardProps {
//   userRole: 'support_staff';
//   supportStaffName?: string;
// }

const SupportDashboard = ({ userRole, supportStaffName = "Support Agent" }) => {
  // Mock data for support staff
  const stats = {
    assignedTickets: 12,
    completedToday: 5,
    avgResponseTime: "8 minutes",
    pendingTickets: 7,
    customerRating: "4.8/5"
  };

  const myTickets = [
    {
      id: "TK-105",
      title: "Login issues with mobile app",
      priority: "high",
      status: "pending",
      customer: "Sarah Johnson",
      assignedAt: "1 hour ago",
      organization: "TechCorp Solutions"
    },
    {
      id: "TK-102", 
      title: "Billing discrepancy inquiry",
      priority: "medium",
      status: "in_progress",
      customer: "Mike Chen",
      assignedAt: "3 hours ago",
      organization: "RetailMax Inc"
    },
    {
      id: "TK-098",
      title: "Feature request for reporting",
      priority: "low",
      status: "in_progress",
      customer: "Lisa Anderson",
      assignedAt: "1 day ago",
      organization: "DataFlow Corp"
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
            Welcome back, {supportStaffName}
          </h1>
          <p className="text-gray-600 mt-1">
            Support Staff Dashboard - Manage your assigned tickets
          </p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
          <MessageSquare className="w-4 h-4 mr-2" />
          Quick Response
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assigned Tickets</CardTitle>
            <TicketIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.assignedTickets}</div>
            <p className="text-xs text-muted-foreground">
              Active assignments
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
              Awaiting response
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.completedToday}</div>
            <p className="text-xs text-muted-foreground">
              Resolved tickets
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.avgResponseTime}</div>
            <p className="text-xs text-muted-foreground">
              Response time
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rating</CardTitle>
            <User className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.customerRating}</div>
            <p className="text-xs text-muted-foreground">
              Customer satisfaction
            </p>
          </CardContent>
        </Card>
      </div>

      {/* My Assigned Tickets */}
      <Card>
        <CardHeader>
          <CardTitle>My Assigned Tickets</CardTitle>
          <CardDescription>Tickets currently assigned to you</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {myTickets.map((ticket) => (
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
                    Customer: {ticket.customer} • {ticket.organization} • Assigned {ticket.assignedAt}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Update Status
                  </Button>
                  <Button size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm">Follow-up: TK-089</span>
              <Badge variant="secondary">10:00 AM</Badge>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm">Client call: TK-092</span>
              <Badge variant="secondary">2:30 PM</Badge>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm">Status review: TK-098</span>
              <Badge variant="secondary">4:00 PM</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">This Week</span>
              <Badge className="bg-green-100 text-green-800">28 resolved</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">This Month</span>
              <Badge className="bg-blue-100 text-blue-800">112 resolved</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Avg Resolution Time</span>
              <Badge variant="secondary">2.1 hours</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SupportDashboard;
