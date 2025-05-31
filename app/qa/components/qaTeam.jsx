
import { useState } from "react";
import { DataPagination } from "@/components/data-pagination";
import { usePagination } from "@/hooks/usePagination";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  User,
  Award,
  Target,
  TrendingUp,
  Clock,
  Star,
  MessageCircle,
  CheckCircle,
  FileText
} from "lucide-react";


const QaTeamPage = ({onManageTeam}) => {
  

  const teamMembers = [
    {
      id: "emp-001",
      name: "John Smith",
      role: "Senior Support Specialist",
      avatar: "JS",
      performance: {
        resolvedTickets: 45,
        avgResponseTime: "8 minutes",
        customerRating: 4.8,
        efficiency: "high"
      },
      currentLoad: 12,
      status: "active"
    },
    {
      id: "emp-002", 
      name: "Sarah Davis",
      role: "Technical Support Lead",
      avatar: "SD",
      performance: {
        resolvedTickets: 38,
        avgResponseTime: "12 minutes",
        customerRating: 4.9,
        efficiency: "high"
      },
      currentLoad: 8,
      status: "active"
    },
    {
      id: "emp-003",
      name: "Mike Johnson",
      role: "Support Specialist",
      avatar: "MJ",
      performance: {
        resolvedTickets: 28,
        avgResponseTime: "15 minutes",
        customerRating: 4.6,
        efficiency: "medium"
      },
      currentLoad: 15,
      status: "active"
    },
    {
      id: "emp-004",
      name: "Lisa Chen",
      role: "Junior Support Specialist",
      avatar: "LC",
      performance: {
        resolvedTickets: 22,
        avgResponseTime: "18 minutes",
        customerRating: 4.4,
        efficiency: "medium"
      },
      currentLoad: 6,
      status: "training"
    }
  ];

  const getEfficiencyColor = (efficiency) => {
    switch (efficiency) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'training': return 'bg-blue-100 text-blue-800';
      case 'unavailable': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

const {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    paginatedData,
    setCurrentPage,
    setItemsPerPage,
  } = usePagination({
    data: teamMembers,
    initialItemsPerPage: 3,
  });


  return (
    <div className="min-h-screen bg-gray-50">

    

        {/* Main Content */}
        <div className="flex-1 p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
              <p className="text-gray-600 mt-1">Monitor team performance and workload distribution</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">
                <TrendingUp className="w-4 h-4 mr-2" />
                Performance Report
              </Button>
              {/* <Link href="/qa/team/manage"> */}
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600"
                        onClick={onManageTeam}>
                  <Users className="w-4 h-4 mr-2" />
                  Team Management
                </Button>
              {/* </Link> */}
            </div>
          </div>

          {/* Team Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Team Members</p>
                    <p className="text-3xl font-bold text-blue-600">4</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
                    <p className="text-3xl font-bold text-green-600">13m</p>
                  </div>
                  <Clock className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Team Rating</p>
                    <p className="text-3xl font-bold text-yellow-600">4.7</p>
                  </div>
                  <Star className="w-8 h-8 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Workload</p>
                    <p className="text-3xl font-bold text-purple-600">41</p>
                  </div>
                  <Target className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Team Members */}
          <Card>
            <CardHeader>
              <CardTitle>Team Performance Overview</CardTitle>
              <CardDescription>Individual performance metrics and current workload</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {paginatedData.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">{member.avatar}</span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-3 mb-1">
                          <h4 className="font-medium text-gray-900">{member.name}</h4>
                          <Badge className={getStatusColor(member.status)}>
                            {member.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{member.role}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-8">
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-900">{member.performance.resolvedTickets}</p>
                        <p className="text-xs text-gray-600">Resolved</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-900">{member.performance.avgResponseTime}</p>
                        <p className="text-xs text-gray-600">Avg Response</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-900">{member.performance.customerRating}</p>
                        <p className="text-xs text-gray-600">Rating</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-900">{member.currentLoad}</p>
                        <p className="text-xs text-gray-600">Current Load</p>
                      </div>
                      <Badge className={getEfficiencyColor(member.performance.efficiency)}>
                        {member.performance.efficiency}
                      </Badge>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Message
                      </Button>
                      <Button variant="outline" size="sm">
                        <Award className="w-4 h-4 mr-1" />
                        Performance
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination component */}
              <div className="mt-6">
                <DataPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={totalItems}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                  onItemsPerPageChange={setItemsPerPage}
                  showItemsPerPage={true}
                  itemsPerPageOptions={[5, 10, 20, 50]}
                />
              </div>
            </CardContent>
          </Card>

          {/* Workload Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Workload Distribution</CardTitle>
              <CardDescription>Current ticket assignment across team members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paginatedData.map((member) => (
                  <div key={member.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium">{member.avatar}</span>
                      </div>
                      <span className="font-medium">{member.name}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-40 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(member.currentLoad / 20) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-12 text-right">{member.currentLoad}/20</span>
                    </div>
                  </div>
                ))}
              </div>
              {/* Pagination component */}
              <div className="mt-6">
                <DataPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={totalItems}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                  onItemsPerPageChange={setItemsPerPage}
                  showItemsPerPage={true}
                  itemsPerPageOptions={[5, 10, 20, 50]}
                />
              </div>
            </CardContent>
          </Card>
        </div>
    </div>
  );
};

export default QaTeamPage;
