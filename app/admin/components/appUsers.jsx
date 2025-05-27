
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  UserPlus,
  Search,
  Filter,
  Shield,
  Mail,
  Calendar,
  MoreHorizontal,
  Eye,
  Edit,
  Ban
} from "lucide-react";

const AppUsersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const users = [
    {
      id: "USR-001",
      name: "John Smith",
      email: "john.smith@techcorp.com",
      role: "qa_personnel",
      organization: "TechCorp Solutions",
      status: "active",
      lastLogin: "2 hours ago",
      created: "2024-01-15",
      ticketsAssigned: 12
    },
    {
      id: "USR-002",
      name: "Sarah Johnson", 
      email: "sarah.j@retailmax.com",
      role: "support_staff",
      organization: "RetailMax Inc",
      status: "active",
      lastLogin: "5 hours ago",
      created: "2024-02-20",
      ticketsAssigned: 8
    },
    {
      id: "USR-003",
      name: "Mike Wilson",
      email: "mike.wilson@dataflow.com",
      role: "support_staff", 
      organization: "DataFlow Corp",
      status: "inactive",
      lastLogin: "3 days ago",
      created: "2024-03-10",
      ticketsAssigned: 3
    },
    {
      id: "USR-004",
      name: "Lisa Chen",
      email: "lisa.chen@servicehub.com",
      role: "qa_personnel",
      organization: "ServiceHub Ltd",
      status: "active",
      lastLogin: "1 hour ago", 
      created: "2024-01-28",
      ticketsAssigned: 15
    }
  ];

  const getRoleColor = (role) => {
    switch (role) {
      case 'qa_personnel': return 'bg-purple-100 text-purple-800';
      case 'support_staff': return 'bg-blue-100 text-blue-800';
      case 'admin': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-600 mt-1">Manage all platform users across organizations</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
          <UserPlus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">256</div>
            <p className="text-xs text-muted-foreground">+15 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">242</div>
            <p className="text-xs text-muted-foreground">94% active rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">QA Personnel</CardTitle>
            <Shield className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">45</div>
            <p className="text-xs text-muted-foreground">Organization managers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Support Staff</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">211</div>
            <p className="text-xs text-muted-foreground">Frontline support</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search users..."
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

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>Manage user accounts and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="font-medium text-gray-900">{user.name}</span>
                    <Badge className={getRoleColor(user.role)}>
                      {user.role.replace('_', ' ')}
                    </Badge>
                    <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 space-x-4">
                    <span className="flex items-center">
                      <Mail className="w-3 h-3 mr-1" />
                      {user.email}
                    </span>
                    <span>•</span>
                    <span>{user.organization}</span>
                    <span>•</span>
                    <span>{user.ticketsAssigned} tickets</span>
                    <span>•</span>
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      Last login: {user.lastLogin}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                    <Ban className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppUsersPage;
