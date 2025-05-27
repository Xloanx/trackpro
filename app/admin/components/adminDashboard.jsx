'use client'
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building, 
  Users, 
  DollarSign, 
  TrendingUp,
  TicketIcon,
  AlertTriangle,
  CheckCircle,
  UserPlus,
  BarChart3
} from "lucide-react";

// interface AdminDashboardProps {
//   userRole: 'admin';
// }

// const AdminDashboard = ({ userRole }: AdminDashboardProps) => {
const AdminDashboard = ({ userRole }) => {
  // Mock data for admin
  const stats = {
    totalOrganizations: 45,
    activeSubscriptions: 42,
    totalUsers: 256,
    monthlyRevenue: "$24,800",
    totalTickets: 1256,
    avgResolutionTime: "4.2 hours",
    customerSatisfaction: "92%"
  };

  const organizations = [
    {
      id: "ORG-001",
      name: "TechCorp Solutions",
      plan: "Enterprise",
      users: 24,
      tickets: 156,
      status: "active",
      lastActivity: "2 hours ago"
    },
    {
      id: "ORG-002",
      name: "RetailMax Inc",
      plan: "Professional", 
      users: 12,
      tickets: 89,
      status: "active",
      lastActivity: "5 hours ago"
    },
    {
      id: "ORG-003",
      name: "DataFlow Corp",
      plan: "Basic",
      users: 8,
      tickets: 34,
      status: "trial",
      lastActivity: "1 day ago"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'trial': return 'bg-blue-100 text-blue-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlanColor = (plan) => {
    switch (plan) {
      case 'Enterprise': return 'bg-purple-100 text-purple-800';
      case 'Professional': return 'bg-blue-100 text-blue-800';
      case 'Basic': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Manage organizations, subscriptions, and platform performance
          </p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Organization
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Organizations</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrganizations}</div>
            <p className="text-xs text-muted-foreground">
              +3 new this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.activeSubscriptions}</div>
            <p className="text-xs text-muted-foreground">
              93% retention rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              Across all organizations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.monthlyRevenue}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Platform Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TicketIcon className="w-5 h-5 mr-2" />
              Ticket Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Total Tickets</span>
              <Badge variant="secondary">{stats.totalTickets}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Avg Resolution Time</span>
              <Badge className="bg-blue-100 text-blue-800">{stats.avgResolutionTime}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Customer Satisfaction</span>
              <Badge className="bg-green-100 text-green-800">{stats.customerSatisfaction}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Growth Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">New Organizations</span>
              <Badge className="bg-green-100 text-green-800">+8 this month</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">User Growth</span>
              <Badge className="bg-blue-100 text-blue-800">+15% MoM</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Revenue Growth</span>
              <Badge className="bg-purple-100 text-purple-800">+12% MoM</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              System Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm">High ticket volume</span>
              <Badge variant="destructive">Alert</Badge>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <span className="text-sm">Server performance</span>
              <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm">Backup completed</span>
              <Badge className="bg-green-100 text-green-800">Success</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Organizations Management */}
      <Card>
        <CardHeader>
          <CardTitle>Organizations Overview</CardTitle>
          <CardDescription>Manage subscribed organizations and their performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {organizations.map((org) => (
              <div key={org.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="font-medium text-gray-900">{org.name}</span>
                    <Badge className={getStatusColor(org.status)}>
                      {org.status}
                    </Badge>
                    <Badge className={getPlanColor(org.plan)}>
                      {org.plan}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    {org.users} users • {org.tickets} tickets • Last activity: {org.lastActivity}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <BarChart3 className="w-4 h-4 mr-1" />
                    Analytics
                  </Button>
                  <Button size="sm">
                    Manage
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

export default AdminDashboard;
