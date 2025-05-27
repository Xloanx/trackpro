
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Server, 
  Database,
  Shield,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Cpu,
  HardDrive,
  Wifi,
  Settings,
  RefreshCw
} from "lucide-react";

const AdminSystemPage = () => {
  const [lastUpdated, setLastUpdated] = useState("2 minutes ago");

  const systemMetrics = {
    serverUptime: "99.9%",
    responseTime: "145ms",
    activeConnections: 1245,
    cpuUsage: "67%",
    memoryUsage: "54%",
    diskUsage: "32%",
    networkLatency: "23ms"
  };

  const systemAlerts = [
    {
      id: "ALT-001",
      type: "warning",
      message: "High CPU usage detected on Server 3",
      timestamp: "10 minutes ago",
      status: "active"
    },
    {
      id: "ALT-002", 
      type: "info",
      message: "Scheduled maintenance completed successfully",
      timestamp: "2 hours ago", 
      status: "resolved"
    },
    {
      id: "ALT-003",
      type: "error",
      message: "Database connection timeout in US-East region",
      timestamp: "5 hours ago",
      status: "investigating"
    },
    {
      id: "ALT-004",
      type: "success",
      message: "Security patch deployed across all servers",
      timestamp: "1 day ago",
      status: "completed"
    }
  ];

  const getAlertColor = (type) => {
    switch (type) {
      case 'error': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'info': return 'bg-blue-100 text-blue-800';
      case 'success': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'error': return <AlertTriangle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'info': return <Activity className="w-4 h-4" />;
      case 'success': return <CheckCircle className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Overview</h1>
          <p className="text-gray-600 mt-1">Monitor platform health and performance</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setLastUpdated("Just now")}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
            <Settings className="w-4 h-4 mr-2" />
            System Settings
          </Button>
        </div>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Server Uptime</CardTitle>
            <Server className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{systemMetrics.serverUptime}</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Activity className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{systemMetrics.responseTime}</div>
            <p className="text-xs text-muted-foreground">Average response</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Connections</CardTitle>
            <Wifi className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{systemMetrics.activeConnections}</div>
            <p className="text-xs text-muted-foreground">Current sessions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
            <Cpu className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{systemMetrics.cpuUsage}</div>
            <p className="text-xs text-muted-foreground">Current load</p>
          </CardContent>
        </Card>
      </div>

      {/* Resource Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="w-5 h-5 mr-2" />
              Resource Usage
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Memory Usage</span>
              <Badge className="bg-blue-100 text-blue-800">{systemMetrics.memoryUsage}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Disk Usage</span>
              <Badge className="bg-green-100 text-green-800">{systemMetrics.diskUsage}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Network Latency</span>
              <Badge className="bg-purple-100 text-purple-800">{systemMetrics.networkLatency}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Last Updated</span>
              <span className="text-sm text-gray-600">{lastUpdated}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Security Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">SSL Certificates</span>
              <Badge className="bg-green-100 text-green-800">Valid</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Firewall Status</span>
              <Badge className="bg-green-100 text-green-800">Active</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Last Security Scan</span>
              <Badge className="bg-blue-100 text-blue-800">2 hours ago</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Threat Level</span>
              <Badge className="bg-green-100 text-green-800">Low</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            System Alerts
          </CardTitle>
          <CardDescription>Recent system events and notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {systemAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-full ${getAlertColor(alert.type)}`}>
                    {getAlertIcon(alert.type)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{alert.message}</p>
                    <div className="flex items-center text-sm text-gray-600 space-x-2">
                      <Clock className="w-3 h-3" />
                      <span>{alert.timestamp}</span>
                      <span>•</span>
                      <Badge variant="outline">{alert.status}</Badge>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSystemPage;
