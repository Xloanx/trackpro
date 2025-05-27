
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
  TicketIcon,
  Building,
  Search,
  Plus,
  BookOpen,
  FileText,
  Video,
  HelpCircle,
  Star,
  Eye,
  Edit
} from "lucide-react";

const SupportKnowledgeBasePage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { name: "Common Issues", count: 24, icon: HelpCircle },
    { name: "How-to Guides", count: 18, icon: BookOpen },
    { name: "Video Tutorials", count: 12, icon: Video },
    { name: "Documentation", count: 36, icon: FileText },
  ];

  const articles = [
    {
      id: "KB-001",
      title: "How to reset user passwords",
      category: "Common Issues",
      views: 1250,
      rating: 4.8,
      lastUpdated: "2 days ago",
      type: "article"
    },
    {
      id: "KB-002", 
      title: "Troubleshooting login failures",
      category: "Common Issues",
      views: 980,
      rating: 4.6,
      lastUpdated: "1 week ago",
      type: "article"
    },
    {
      id: "KB-003",
      title: "Setting up billing configurations",
      category: "How-to Guides",
      views: 750,
      rating: 4.9,
      lastUpdated: "3 days ago",
      type: "guide"
    },
    {
      id: "KB-004",
      title: "Mobile app setup walkthrough",
      category: "Video Tutorials",
      views: 2100,
      rating: 4.7,
      lastUpdated: "1 day ago",
      type: "video"
    },
    {
      id: "KB-005",
      title: "API integration best practices",
      category: "Documentation",
      views: 420,
      rating: 4.5,
      lastUpdated: "5 days ago",
      type: "documentation"
    }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'guide': return <BookOpen className="w-4 h-4" />;
      case 'documentation': return <FileText className="w-4 h-4" />;
      default: return <HelpCircle className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'video': return 'bg-purple-100 text-purple-800';
      case 'guide': return 'bg-blue-100 text-blue-800';
      case 'documentation': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

        {/* Main Content */}
        <div className="flex-1 p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Knowledge Base</h1>
              <p className="text-gray-600 mt-1">Find answers and documentation to help resolve customer issues</p>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
              <Plus className="w-4 h-4 mr-2" />
              Suggest Article
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search knowledge base..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Categories */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Card key={category.name} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{category.name}</CardTitle>
                  <category.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{category.count}</div>
                  <p className="text-xs text-muted-foreground">articles</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Popular Articles */}
          <Card>
            <CardHeader>
              <CardTitle>Popular Articles</CardTitle>
              <CardDescription>Most viewed knowledge base articles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {articles.map((article) => (
                  <div key={article.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Badge className={getTypeColor(article.type)}>
                          {getTypeIcon(article.type)}
                          <span className="ml-1">{article.type}</span>
                        </Badge>
                        <span className="text-sm text-gray-500">{article.category}</span>
                      </div>
                      <h4 className="font-medium text-gray-900 mb-1">{article.title}</h4>
                      <div className="text-sm text-gray-600 space-x-4">
                        <span><Eye className="w-3 h-3 inline mr-1" />{article.views} views</span>
                        <span>•</span>
                        <span><Star className="w-3 h-3 inline mr-1" />{article.rating}/5</span>
                        <span>•</span>
                        <span>Updated: {article.lastUpdated}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm">
                        View
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

export default SupportKnowledgeBasePage;
