'use client'
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
// import { useToast } from "@/hooks/use-toast";
import { 
  Zap, 
  Search, 
  ArrowLeft,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  MessageSquare,
  Calendar,
  User
} from "lucide-react";
import Link from "next/link";

// interface TicketStatus {
//   id: string;
//   title: string;
//   status: "open" | "in_progress" | "resolved" | "closed";
//   priority: "low" | "medium" | "high" | "urgent";
//   createdAt: string;
//   lastUpdate: string;
//   organization: string;
//   category: string;
//   description: string;
//   updates: TicketUpdate[];
// }

// interface TicketUpdate {
//   id: string;
//   message: string;
//   timestamp: string;
//   author: string;
//   type: "customer" | "agent" | "system";
// }

const TicketTrackingPage = () => {
  // const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("ticket");
  const [ticketData, setTicketData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock ticket data
  const mockTickets = {
    "TC-123456": {
      id: "TC-123456",
      title: "Login issues with mobile app",
      status: "in_progress",
      priority: "high",
      createdAt: "2024-01-15T10:30:00Z",
      lastUpdate: "2024-01-16T14:20:00Z",
      organization: "TechCorp Solutions",
      category: "Technical Support",
      description: "Unable to login to mobile application after recent update",
      updates: [
        {
          id: "1",
          message: "Thank you for contacting us. We're investigating the login issue you reported.",
          timestamp: "2024-01-15T11:00:00Z",
          author: "Support Agent Sarah",
          type: "agent"
        },
        {
          id: "2", 
          message: "We've identified the issue and are working on a fix. Expected resolution within 24 hours.",
          timestamp: "2024-01-16T09:15:00Z",
          author: "Technical Team",
          type: "agent"
        },
        {
          id: "3",
          message: "A new app version (v2.1.3) has been released with the login fix. Please update your app.",
          timestamp: "2024-01-16T14:20:00Z",
          author: "System",
          type: "system"
        }
      ]
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      // toast({
      //   title: "Search Required",
      //   description: "Please enter a ticket ID or email address.",
      //   variant: "destructive"
      // });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const ticket = mockTickets[searchQuery.toUpperCase()];
      if (ticket) {
        setTicketData(ticket);
        // toast({
        //   title: "Ticket Found",
        //   description: `Found ticket ${ticket.id}`,
        // });
      } else {
        setTicketData(null);
        // toast({
        //   title: "Ticket Not Found",
        //   description: "No ticket found with the provided information.",
        //   variant: "destructive"
        // });
      }
      setIsLoading(false);
    }, 1000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'open': return <AlertCircle className="w-4 h-4" />;
      case 'in_progress': return <Clock className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      case 'closed': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getAuthorIcon = (type) => {
    switch (type) {
      case 'customer': return <User className="w-4 h-4" />;
      case 'agent': return <MessageSquare className="w-4 h-4" />;
      case 'system': return <AlertCircle className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TrackPro
              </span>
            </Link>
            <Link href="/">
              <Button variant="ghost">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Track Your Ticket</h1>
          <p className="text-lg text-gray-600">
            Enter your ticket ID or email address to view your complaint status and updates.
          </p>
        </div>

        {/* Search Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="w-5 h-5 mr-2" />
              Search for Your Ticket
            </CardTitle>
            <CardDescription>
              Enter your ticket reference number (e.g., TC-123456) or the email address used when submitting
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Enter ticket ID (TC-123456) or email address"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button 
                onClick={handleSearch} 
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-600 to-purple-600"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Ticket Details */}
        {ticketData && (
          <div className="space-y-6">
            {/* Ticket Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Ticket Details</span>
                  <div className="flex space-x-2">
                    <Badge className={getStatusColor(ticketData.status)}>
                      {getStatusIcon(ticketData.status)}
                      <span className="ml-1">{ticketData.status.replace('_', ' ').toUpperCase()}</span>
                    </Badge>
                    <Badge className={getPriorityColor(ticketData.priority)}>
                      {ticketData.priority.toUpperCase()} PRIORITY
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-500">Ticket ID:</span>
                      <p className="font-semibold text-lg">{ticketData.id}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Title:</span>
                      <p className="font-medium">{ticketData.title}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Organization:</span>
                      <p>{ticketData.organization}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Category:</span>
                      <p>{ticketData.category}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-500">Created:</span>
                      <p className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(ticketData.createdAt)}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Last Update:</span>
                      <p className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {formatDate(ticketData.lastUpdate)}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Description:</span>
                      <p className="text-sm">{ticketData.description}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ticket Updates */}
            <Card>
              <CardHeader>
                <CardTitle>Ticket Updates</CardTitle>
                <CardDescription>
                  Timeline of all updates and communications for this ticket
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ticketData.updates.map((update, index) => (
                    <div key={update.id} className="flex space-x-3">
                      <div className="flex-shrink-0">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          update.type === 'customer' ? 'bg-blue-100 text-blue-600' :
                          update.type === 'agent' ? 'bg-green-100 text-green-600' :
                          'bg-gray-100 text-gray-600'
                        }`}>
                          {getAuthorIcon(update.type)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">
                            {update.author}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatDate(update.timestamp)}
                          </p>
                        </div>
                        <p className="text-sm text-gray-700 mt-1">
                          {update.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Add Comment
                  </Button>
                  <Link href="/complaint" className="flex-1">
                    <Button variant="outline" className="w-full">
                      Submit New Complaint
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Help Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Need Help?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Finding Your Ticket ID</h4>
                <p className="text-sm text-gray-600">
                  Your ticket ID was provided when you submitted your complaint. Check your email confirmation or look for the format TC-XXXXXX.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Contact Support</h4>
                <p className="text-sm text-gray-600">
                  If you can't find your ticket or need immediate assistance, please contact our support team directly.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TicketTrackingPage;
