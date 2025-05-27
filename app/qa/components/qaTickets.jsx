
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
  Users,
  TicketIcon,
  Building,
  Search,
  Filter,
  AlertTriangle,
  Clock,
  User,
  Calendar,
  CheckCircle,
  XCircle,
  Eye,
  MessageSquare,
  TrendingUp,
  FileText
} from "lucide-react";
import Link from "next/link";

const QaTicketsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");



  const tickets = [
    {
      id: "TK-201",
      title: "Critical payment gateway failure",
      priority: "critical",
      status: "escalated",
      assignee: "John Smith",
      customer: "Enterprise Corp",
      created: "2 hours ago",
      lastUpdate: "45 minutes ago",
      slaStatus: "breached",
      category: "technical"
    },
    {
      id: "TK-198",
      title: "Mobile app login issues",
      priority: "high",
      status: "in_progress",
      assignee: "Sarah Davis",
      customer: "TechStart Inc",
      created: "4 hours ago",
      lastUpdate: "1 hour ago",
      slaStatus: "warning",
      category: "technical"
    },
    {
      id: "TK-195",
      title: "Account billing discrepancy",
      priority: "medium",
      status: "pending_review",
      assignee: "Mike Johnson",
      customer: "RetailMax Ltd",
      created: "1 day ago",
      lastUpdate: "3 hours ago",
      slaStatus: "ok",
      category: "billing"
    },
    {
      id: "TK-192",
      title: "Feature request - Dashboard export",
      priority: "low",
      status: "resolved",
      assignee: "Lisa Chen",
      customer: "DataFlow Systems",
      created: "2 days ago",
      lastUpdate: "6 hours ago",
      slaStatus: "ok",
      category: "enhancement"
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'escalated': return 'bg-red-100 text-red-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'pending_review': return 'bg-orange-100 text-orange-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSlaColor = (sla) => {
    switch (sla) {
      case 'breached': return 'text-red-600';
      case 'warning': return 'text-orange-600';
      case 'ok': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      

        {/* Main Content */}
        <div className="flex-1 p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Ticket Management</h1>
              <p className="text-gray-600 mt-1">Monitor and oversee all customer support tickets</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">
                <TrendingUp className="w-4 h-4 mr-2" />
                Analytics
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                <MessageSquare className="w-4 h-4 mr-2" />
                Create Ticket
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Critical/High</p>
                    <p className="text-3xl font-bold text-red-600">8</p>
                  </div>
                  <AlertTriangle className="w-8 h-8 text-red-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">SLA Breached</p>
                    <p className="text-3xl font-bold text-orange-600">3</p>
                  </div>
                  <Clock className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Tickets</p>
                    <p className="text-3xl font-bold text-blue-600">24</p>
                  </div>
                  <TicketIcon className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Resolved Today</p>
                    <p className="text-3xl font-bold text-green-600">12</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search tickets by ID, title, or customer..."
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
              <CardTitle>All Tickets</CardTitle>
              <CardDescription>Complete overview of customer support tickets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tickets.map((ticket) => (
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
                        <span className={`text-xs font-medium ${getSlaColor(ticket.slaStatus)}`}>
                          SLA: {ticket.slaStatus}
                        </span>
                      </div>
                      <h4 className="font-medium text-gray-900 mb-1">{ticket.title}</h4>
                      <div className="text-sm text-gray-600 space-x-4">
                        <span><User className="w-3 h-3 inline mr-1" />{ticket.assignee}</span>
                        <span>•</span>
                        <span>{ticket.customer}</span>
                        <span>•</span>
                        <span><Calendar className="w-3 h-3 inline mr-1" />Created: {ticket.created}</span>
                        <span>•</span>
                        <span>Updated: {ticket.lastUpdate}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        Escalate
                      </Button>
                      <Button size="sm">
                        Assign
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

export default QaTicketsPage;
