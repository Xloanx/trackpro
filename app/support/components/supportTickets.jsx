
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Zap,
  Menu,
  Bell,
  Settings,
  LogOut,
  BarChart3,
  TicketIcon,
  Building,
  Search,
  Filter,
  MessageSquare,
  Clock,
  User,
  AlertCircle,
  CheckCircle
} from "lucide-react";

const SupportTicketsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");


  const myTickets = [
    {
      id: "TK-105",
      title: "Login issues with mobile app",
      priority: "high",
      status: "pending",
      customer: "Sarah Johnson",
      organization: "TechCorp Solutions",
      lastUpdate: "30 minutes ago",
      responseTime: "8 minutes"
    },
    {
      id: "TK-102", 
      title: "Billing discrepancy inquiry",
      priority: "medium",
      status: "in_progress",
      customer: "Mike Chen",
      organization: "RetailMax Inc",
      lastUpdate: "2 hours ago",
      responseTime: "15 minutes"
    },
    {
      id: "TK-098",
      title: "Feature request for reporting",
      priority: "low",
      status: "in_progress",
      customer: "Lisa Anderson",
      organization: "DataFlow Corp",
      lastUpdate: "1 day ago",
      responseTime: "1 hour"
    },
    {
      id: "TK-094",
      title: "Password reset not working",
      priority: "high",
      status: "resolved",
      customer: "Tom Wilson",
      organization: "StartupXYZ",
      lastUpdate: "3 hours ago",
      responseTime: "5 minutes"
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <AlertCircle className="w-4 h-4" />;
      case 'in_progress': return <Clock className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
     

        {/* Main Content */}
        <div className="flex-1 p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Tickets</h1>
              <p className="text-gray-600 mt-1">Manage your assigned support tickets</p>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
              <MessageSquare className="w-4 h-4 mr-2" />
              Quick Response
            </Button>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search tickets..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Tickets List */}
          <Card>
            <CardHeader>
              <CardTitle>Assigned Tickets</CardTitle>
              <CardDescription>Your current ticket assignments</CardDescription>
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
                          {getStatusIcon(ticket.status)}
                          <span className="ml-1">{ticket.status.replace('_', ' ')}</span>
                        </Badge>
                      </div>
                      <h4 className="font-medium text-gray-900 mb-1">{ticket.title}</h4>
                      <div className="text-sm text-gray-600 space-x-4">
                        <span><User className="w-3 h-3 inline mr-1" />{ticket.customer}</span>
                        <span>•</span>
                        <span>{ticket.organization}</span>
                        <span>•</span>
                        <span><Clock className="w-3 h-3 inline mr-1" />Response: {ticket.responseTime}</span>
                        <span>•</span>
                        <span>Updated: {ticket.lastUpdate}</span>
                      </div>
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
        </div>
    </div>
  );
};

export default SupportTicketsPage;
