
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Clock,
  User,
  Calendar,
  MessageSquare
} from "lucide-react";

// interface Ticket {
//   id: string;
//   title: string;
//   description: string;
//   priority: 'low' | 'medium' | 'high' | 'urgent';
//   status: 'pending' | 'in_progress' | 'resolved' | 'closed';
//   assignee: string;
//   reporter: string;
//   createdAt: string;
//   updatedAt: string;
//   organization: string;
//   category: string;
// }

const TicketList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock ticket data - will be replaced with Supabase data
//   const tickets: Ticket[] = [
  const tickets = [
    {
      id: "TK-001",
      title: "Payment Gateway Integration Issue", 
      description: "Customer unable to complete payment due to gateway timeout",
      priority: "high",
      status: "pending",
      assignee: "John Doe",
      reporter: "customer@example.com",
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-15T10:30:00Z",
      organization: "TechCorp Solutions",
      category: "Technical"
    },
    {
      id: "TK-002",
      title: "Account Access Denied",
      description: "User reporting inability to log into their account after password reset",
      priority: "medium", 
      status: "in_progress",
      assignee: "Jane Smith",
      reporter: "user@company.com",
      createdAt: "2024-01-15T09:15:00Z",
      updatedAt: "2024-01-15T11:20:00Z",
      organization: "Digital Dynamics",
      category: "Account"
    },
    {
      id: "TK-003",
      title: "Feature Request - Dark Mode",
      description: "Multiple users requesting dark mode option in the application",
      priority: "low",
      status: "resolved",
      assignee: "Mike Johnson",
      reporter: "feedback@users.com",
      createdAt: "2024-01-14T14:22:00Z",
      updatedAt: "2024-01-15T16:45:00Z",
      organization: "TechCorp Solutions",
      category: "Enhancement"
    },
    {
      id: "TK-004",
      title: "Data Synchronization Error",
      description: "Customer data not syncing properly between mobile and web platforms",
      priority: "urgent",
      status: "pending",
      assignee: "Sarah Wilson",
      reporter: "admin@enterprise.com",
      createdAt: "2024-01-15T13:45:00Z",
      updatedAt: "2024-01-15T13:45:00Z",
      organization: "Enterprise Plus",
      category: "Technical"
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500 text-white';
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.assignee.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ticket Management</h1>
          <p className="text-gray-600 mt-1">Track and manage customer service requests</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
          Create New Ticket
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search tickets by ID, title, or assignee..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("all")}
              >
                All
              </Button>
              <Button
                variant={statusFilter === "pending" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("pending")}
              >
                Pending
              </Button>
              <Button
                variant={statusFilter === "in_progress" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("in_progress")}
              >
                In Progress
              </Button>
              <Button
                variant={statusFilter === "resolved" ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter("resolved")}
              >
                Resolved
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tickets List */}
      <div className="space-y-4">
        {filteredTickets.map((ticket) => (
          <Card key={ticket.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <span className="font-mono text-sm font-medium text-blue-600">{ticket.id}</span>
                    <Badge className={getPriorityColor(ticket.priority)}>
                      {ticket.priority}
                    </Badge>
                    <Badge className={getStatusColor(ticket.status)}>
                      {ticket.status.replace('_', ' ')}
                    </Badge>
                    <Badge variant="outline">{ticket.category}</Badge>
                  </div>
                  <CardTitle className="text-xl">{ticket.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {ticket.description}
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <div>
                    <span className="text-gray-500">Assignee:</span>
                    <br />
                    <span className="font-medium">{ticket.assignee}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4 text-gray-400" />
                  <div>
                    <span className="text-gray-500">Reporter:</span>
                    <br />
                    <span className="font-medium">{ticket.reporter}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div>
                    <span className="text-gray-500">Created:</span>
                    <br />
                    <span className="font-medium">{formatDate(ticket.createdAt)}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <div>
                    <span className="text-gray-500">Updated:</span>
                    <br />
                    <span className="font-medium">{formatDate(ticket.updatedAt)}</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t">
                <span className="text-sm text-gray-500">Organization: </span>
                <span className="text-sm font-medium">{ticket.organization}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredTickets.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <div className="text-gray-400 mb-4">
              <Filter className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets found</h3>
            <p className="text-gray-600">
              {searchTerm || statusFilter !== "all" 
                ? "Try adjusting your search or filter criteria"
                : "Create your first ticket to get started"
              }
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TicketList;
