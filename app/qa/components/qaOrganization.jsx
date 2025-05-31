
import { useState } from "react";
import { DataPagination } from '@/components/data-pagination';
import { usePagination } from '@/hooks/usePagination';
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
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Activity,
  Target,
  FileText,
  Shield
} from "lucide-react";
import Link from "next/link";

const QaOrganizationPage = () => {

  const orgMetrics = {
    totalCustomers: 248,
    activeSubscriptions: 185,
    monthlyRevenue: 45600,
    supportTickets: 156,
    customerSatisfaction: 4.7,
    serviceUptime: 99.8
  };

  const departmentPerformance = [
    {
      id: 1,
      name: "Technical Support",
      tickets: 89,
      avgResolution: "4.2 hours",
      satisfaction: 4.8,
      efficiency: "high"
    },
    {
      id: 2,
      name: "Billing Support", 
      tickets: 34,
      avgResolution: "2.1 hours",
      satisfaction: 4.6,
      efficiency: "high"
    },
    {
      id: 3,
      name: "Product Support",
      tickets: 23,
      avgResolution: "6.5 hours", 
      satisfaction: 4.9,
      efficiency: "medium"
    },
    {
      id: 4,
      name: "General Inquiries",
      tickets: 10,
      avgResolution: "1.8 hours",
      satisfaction: 4.4,
      efficiency: "high"
    }
  ];

  const qualityMetrics = [
    {
      metric: "First Contact Resolution",
      value: "78%",
      target: "80%",
      trend: "up",
      status: "warning"
    },
    {
      metric: "Customer Satisfaction Score",
      value: "4.7/5",
      target: "4.5/5",
      trend: "up", 
      status: "good"
    },
    {
      metric: "Average Resolution Time",
      value: "4.2h",
      target: "4h",
      trend: "down",
      status: "warning"
    },
    {
      metric: "SLA Compliance",
      value: "92%",
      target: "95%",
      trend: "up",
      status: "warning"
    }
  ];

  const {
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    paginatedData,
    setCurrentPage,
    setItemsPerPage,
  } = usePagination({
    data: departmentPerformance,
    initialItemsPerPage: 3,
  });

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
      case 'good': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">


        {/* Main Content */}
        <div className="flex-1 p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">TechCorp Solutions - Organization Overview</h1>
              <p className="text-gray-600 mt-1">Comprehensive view of organizational performance and quality metrics</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">
                <Shield className="w-4 h-4 mr-2" />
                Quality Audit
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>

          {/* Organization Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Customers</p>
                    <p className="text-2xl font-bold text-blue-600">{orgMetrics.totalCustomers}</p>
                  </div>
                  <Users className="w-6 h-6 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Subs</p>
                    <p className="text-2xl font-bold text-green-600">{orgMetrics.activeSubscriptions}</p>
                  </div>
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                    <p className="text-2xl font-bold text-purple-600">${orgMetrics.monthlyRevenue.toLocaleString()}</p>
                  </div>
                  <DollarSign className="w-6 h-6 text-purple-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Support Tickets</p>
                    <p className="text-2xl font-bold text-orange-600">{orgMetrics.supportTickets}</p>
                  </div>
                  <TicketIcon className="w-6 h-6 text-orange-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">CSAT Score</p>
                    <p className="text-2xl font-bold text-yellow-600">{orgMetrics.customerSatisfaction}</p>
                  </div>
                  <TrendingUp className="w-6 h-6 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Service Uptime</p>
                    <p className="text-2xl font-bold text-green-600">{orgMetrics.serviceUptime}%</p>
                  </div>
                  <Activity className="w-6 h-6 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quality Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>Quality Assurance Metrics</CardTitle>
              <CardDescription>Key performance indicators for service quality</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {qualityMetrics.map((metric, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{metric.metric}</h4>
                      <TrendingUp className={`w-4 h-4 ${getStatusColor(metric.status)}`} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                      <p className="text-sm text-gray-600">Target: {metric.target}</p>
                      <Badge className={metric.status === 'good' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                        {metric.status === 'good' ? 'On Target' : 'Needs Attention'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Department Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Department Performance</CardTitle>
              <CardDescription>Performance breakdown by support department</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paginatedData.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">{item.name}</h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span><TicketIcon className="w-3 h-3 inline mr-1" />{item.tickets} tickets</span>
                        <span><Clock className="w-3 h-3 inline mr-1" />{item.avgResolution} avg</span>
                        <span><TrendingUp className="w-3 h-3 inline mr-1" />{item.satisfaction} rating</span>
                      </div>
                    </div>
                    <Badge className={getEfficiencyColor(item.efficiency)}>
                      {item.efficiency} efficiency
                    </Badge>
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

export default QaOrganizationPage;
