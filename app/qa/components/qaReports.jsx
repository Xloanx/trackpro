
import { useState } from "react";
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
  FileText,
  Download,
  Calendar,
  TrendingUp,
  PieChart,
  LineChart,
  Filter,
  RefreshCw
} from "lucide-react";
import Link from "next/link";

const QaReportsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("thisMonth");

  const reportCategories = [
    {
      title: "Quality Assurance Report",
      description: "Comprehensive quality metrics and performance analysis",
      lastGenerated: "2 hours ago",
      type: "quality",
      icon: BarChart3
    },
    {
      title: "Team Performance Report",
      description: "Individual and team performance analytics",
      lastGenerated: "1 day ago", 
      type: "performance",
      icon: Users
    },
    {
      title: "Customer Satisfaction Report",
      description: "Customer feedback and satisfaction trends",
      lastGenerated: "3 hours ago",
      type: "satisfaction",
      icon: TrendingUp
    },
    {
      title: "SLA Compliance Report",
      description: "Service level agreement compliance tracking",
      lastGenerated: "5 hours ago",
      type: "sla",
      icon: TicketIcon
    }
  ];

  const kpiSummary = {
    totalTickets: 1247,
    resolvedTickets: 1089,
    avgResolutionTime: "3.8 hours",
    customerSatisfaction: 4.7,
    slaCompliance: 92.4,
    firstContactResolution: 78.5
  };

  const trendData = [
    { period: "Week 1", tickets: 65, satisfaction: 4.6, resolution: 4.2 },
    { period: "Week 2", tickets: 72, satisfaction: 4.7, resolution: 3.9 },
    { period: "Week 3", tickets: 68, satisfaction: 4.8, resolution: 3.6 },
    { period: "Week 4", tickets: 71, satisfaction: 4.7, resolution: 3.8 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
        {/* Main Content */}
        <div className="flex-1 p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
              <p className="text-gray-600 mt-1">Comprehensive quality assurance and performance reporting</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Date Range
              </Button>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          {/* KPI Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">Total Tickets</p>
                  <p className="text-2xl font-bold text-blue-600">{kpiSummary.totalTickets}</p>
                  <p className="text-xs text-green-600">+12% from last month</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">Resolved</p>
                  <p className="text-2xl font-bold text-green-600">{kpiSummary.resolvedTickets}</p>
                  <p className="text-xs text-green-600">87% resolution rate</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">Avg Resolution</p>
                  <p className="text-2xl font-bold text-orange-600">{kpiSummary.avgResolutionTime}</p>
                  <p className="text-xs text-green-600">-8% improvement</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">CSAT Score</p>
                  <p className="text-2xl font-bold text-yellow-600">{kpiSummary.customerSatisfaction}</p>
                  <p className="text-xs text-green-600">+0.2 improvement</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">SLA Compliance</p>
                  <p className="text-2xl font-bold text-purple-600">{kpiSummary.slaCompliance}%</p>
                  <p className="text-xs text-yellow-600">-3% from target</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600">FCR Rate</p>
                  <p className="text-2xl font-bold text-indigo-600">{kpiSummary.firstContactResolution}%</p>
                  <p className="text-xs text-green-600">+5% improvement</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Available Reports */}
          <Card>
            <CardHeader>
              <CardTitle>Available Reports</CardTitle>
              <CardDescription>Generate and download comprehensive quality reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reportCategories.map((report, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <report.icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{report.title}</h4>
                          <p className="text-sm text-gray-600">{report.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Last generated: {report.lastGenerated}</span>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <RefreshCw className="w-3 h-3 mr-1" />
                          Generate
                        </Button>
                        <Button size="sm">
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Trend Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LineChart className="w-5 h-5 mr-2" />
                  Weekly Trends
                </CardTitle>
                <CardDescription>Key metrics over the past 4 weeks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trendData.map((week, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium">{week.period}</span>
                      <div className="flex space-x-6 text-sm">
                        <span><TicketIcon className="w-3 h-3 inline mr-1" />{week.tickets}</span>
                        <span><TrendingUp className="w-3 h-3 inline mr-1" />{week.satisfaction}</span>
                        <span>⏱️ {week.resolution}h</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="w-5 h-5 mr-2" />
                  Quality Distribution
                </CardTitle>
                <CardDescription>Quality metrics breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Excellent (4.5-5.0)</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '68%' }}></div>
                      </div>
                      <span className="text-sm font-medium">68%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Good (4.0-4.4)</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '24%' }}></div>
                      </div>
                      <span className="text-sm font-medium">24%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Average (3.0-3.9)</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '6%' }}></div>
                      </div>
                      <span className="text-sm font-medium">6%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Poor (1.0-2.9)</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-red-600 h-2 rounded-full" style={{ width: '2%' }}></div>
                      </div>
                      <span className="text-sm font-medium">2%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
    </div>
  );
};

export default QaReportsPage;
