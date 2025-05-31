import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  FileText,
  Plus,
  Search,
  Edit,
  Trash2,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Shield,
  UserPlus,
  Filter,
  Download
} from "lucide-react";
import { RoleManagement } from "./qaRoleManagement";

const QaTeamManagementPage = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [currentOrganization, setCurrentOrganization] = useState({
    id: "org-001",
    name: "TechCorp Solutions",
    type: "Technology",
    status: "active",
    memberCount: 25,
    ticketCount: 156
  });

  const [newMember, setNewMember] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "support_specialist",
    department: "support",
    startDate: "",
    location: ""
  });

  const teamMembers = [
    {
      id: "emp-001",
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@company.com",
      phone: "+1 (555) 123-4567",
      role: "Senior Support Specialist",
      department: "Support",
      startDate: "2023-01-15",
      location: "New York, NY",
      status: "active",
      avatar: "JS",
      performance: {
        ticketsResolved: 145,
        avgResponseTime: "8 minutes",
        customerRating: 4.8
      }
    },
    {
      id: "emp-002",
      firstName: "Sarah",
      lastName: "Davis",
      email: "sarah.davis@company.com",
      phone: "+1 (555) 234-5678",
      role: "Technical Support Lead",
      department: "Technical Support",
      startDate: "2022-08-20",
      location: "San Francisco, CA",
      status: "active",
      avatar: "SD",
      performance: {
        ticketsResolved: 198,
        avgResponseTime: "12 minutes",
        customerRating: 4.9
      }
    },
    {
      id: "emp-003",
      firstName: "Mike",
      lastName: "Johnson",
      email: "mike.johnson@company.com",
      phone: "+1 (555) 345-6789",
      role: "Support Specialist",
      department: "Support",
      startDate: "2023-03-10",
      location: "Austin, TX",
      status: "active",
      avatar: "MJ",
      performance: {
        ticketsResolved: 87,
        avgResponseTime: "15 minutes",
        customerRating: 4.6
      }
    },
    {
      id: "emp-004",
      firstName: "Lisa",
      lastName: "Chen",
      email: "lisa.chen@company.com",
      phone: "+1 (555) 456-7890",
      role: "Junior Support Specialist",
      department: "Support",
      startDate: "2023-09-01",
      location: "Seattle, WA",
      status: "training",
      avatar: "LC",
      performance: {
        ticketsResolved: 34,
        avgResponseTime: "18 minutes",
        customerRating: 4.4
      }
    }
  ];

  const roles = [
    { value: "all", label: "All Roles" },
    { value: "support_manager", label: "Support Manager" },
    { value: "senior_support", label: "Senior Support Specialist" },
    { value: "support_specialist", label: "Support Specialist" },
    { value: "junior_support", label: "Junior Support Specialist" }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'training': return 'bg-blue-100 text-blue-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddMember = () => {
    // Here you would typically send the data to your backend
    console.log('Adding new team member:', newMember);
    setShowAddForm(false);
    setNewMember({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      role: "support_specialist",
      department: "support",
      startDate: "",
      location: ""
    });
  };

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = 
      member.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRole = filterRole === "all" || member.role.toLowerCase().includes(filterRole.replace('_', ' '));
    
    return matchesSearch && matchesRole;
  });

  return (
    <div className="min-h-screen bg-gray-50">
       {/* Main Content */}
        <div className="flex-1 p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
              <p className="text-gray-600 mt-1">Manage roles and team members for {currentOrganization.name}</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button 
                onClick={() => setShowAddForm(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add Team Member
              </Button>
            </div>
          </div>

          <Tabs defaultValue="roles" className="space-y-6">
            <TabsList>
              <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
              <TabsTrigger value="members">Team Members</TabsTrigger>
            </TabsList>

            <TabsContent value="roles">
              <RoleManagement />
            </TabsContent>

            <TabsContent value="members" className="space-y-6">
              {/* Add Member Form */}
              {showAddForm && (
                <Card>
                  <CardHeader>
                    <CardTitle>Add New Team Member</CardTitle>
                    <CardDescription>Enter the details for the new team member</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={newMember.firstName}
                          onChange={(e) => setNewMember({...newMember, firstName: e.target.value})}
                          placeholder="Enter first name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={newMember.lastName}
                          onChange={(e) => setNewMember({...newMember, lastName: e.target.value})}
                          placeholder="Enter last name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={newMember.email}
                          onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                          placeholder="Enter email address"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={newMember.phone}
                          onChange={(e) => setNewMember({...newMember, phone: e.target.value})}
                          placeholder="Enter phone number"
                        />
                      </div>
                      <div>
                        <Label htmlFor="role">Role</Label>
                        <select
                          id="role"
                          value={newMember.role}
                          onChange={(e) => setNewMember({...newMember, role: e.target.value})}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
                          <option value="support_specialist">Support Specialist</option>
                          <option value="senior_support">Senior Support Specialist</option>
                          <option value="support_lead">Technical Support Lead</option>
                          <option value="junior_support">Junior Support Specialist</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={newMember.startDate}
                          onChange={(e) => setNewMember({...newMember, startDate: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={newMember.location}
                          onChange={(e) => setNewMember({...newMember, location: e.target.value})}
                          placeholder="Enter location"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end space-x-3 mt-6">
                      <Button variant="outline" onClick={() => setShowAddForm(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddMember}>
                        Add Member
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Search and Filter */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          placeholder="Search team members..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <select
                      value={filterRole}
                      onChange={(e) => setFilterRole(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md"
                    >
                      {roles.map((role) => (
                        <option key={role.value} value={role.value}>
                          {role.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </CardContent>
              </Card>

              {/* Team Members List */}
              <Card>
                <CardHeader>
                  <CardTitle>Team Members ({filteredMembers.length})</CardTitle>
                  <CardDescription>Manage your support team</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredMembers.map((member) => (
                      <div key={member.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-medium">{member.avatar}</span>
                            </div>
                            <div>
                              <div className="flex items-center space-x-3 mb-1">
                                <h4 className="font-medium text-gray-900">
                                  {member.firstName} {member.lastName}
                                </h4>
                                <Badge className={getStatusColor(member.status)}>
                                  {member.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600">{member.role}</p>
                              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                                <span className="flex items-center">
                                  <Mail className="w-3 h-3 mr-1" />
                                  {member.email}
                                </span>
                                <span className="flex items-center">
                                  <Phone className="w-3 h-3 mr-1" />
                                  {member.phone}
                                </span>
                                <span className="flex items-center">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {member.location}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-6">
                            <div className="text-center">
                              <p className="text-sm font-medium text-gray-900">{member.performance.ticketsResolved}</p>
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
                            
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Shield className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
    </div>
  );
};

export default QaTeamManagementPage;