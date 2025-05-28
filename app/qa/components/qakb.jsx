'use client'
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Plus,
  Search,
  Upload,
  Edit,
  Trash2,
  Eye,
  Filter,
  BookOpen,
  MessageSquare,
  Calendar,
  Tag
} from "lucide-react";
import Link from "next/link";

const QaKnowledgeBasePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const knowledgeBaseArticles = [
    {
      id: "kb-001",
      title: "Payment Processing Troubleshooting",
      category: "payments",
      content: "Step-by-step guide for resolving common payment issues including failed transactions, refund processing, and payment method updates.",
      tags: ["payments", "troubleshooting", "transactions"],
      author: "Sarah Davis",
      lastUpdated: "2024-01-15",
      views: 145,
      helpful: 23,
      status: "published"
    },
    {
      id: "kb-002",
      title: "Account Access Recovery Process",
      category: "account",
      content: "Comprehensive guide for helping customers regain access to their accounts, including password resets, two-factor authentication issues, and locked accounts.",
      tags: ["account", "security", "access"],
      author: "John Smith",
      lastUpdated: "2024-01-12",
      views: 89,
      helpful: 18,
      status: "published"
    },
    {
      id: "kb-003",
      title: "API Integration Guidelines",
      category: "technical",
      content: "Technical documentation for common API integration issues and best practices for developers using our platform.",
      tags: ["api", "integration", "technical"],
      author: "Mike Johnson",
      lastUpdated: "2024-01-10",
      views: 67,
      helpful: 12,
      status: "draft"
    },
    {
      id: "kb-004",
      title: "Billing and Subscription Management",
      category: "billing",
      content: "Guide for handling billing inquiries, subscription changes, invoice requests, and pricing plan modifications.",
      tags: ["billing", "subscription", "pricing"],
      author: "Lisa Chen",
      lastUpdated: "2024-01-08",
      views: 123,
      helpful: 31,
      status: "published"
    }
  ];

  const categories = [
    { id: "all", name: "All Categories", count: 4 },
    { id: "payments", name: "Payments", count: 1 },
    { id: "account", name: "Account", count: 1 },
    { id: "technical", name: "Technical", count: 1 },
    { id: "billing", name: "Billing", count: 1 }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredArticles = knowledgeBaseArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
        {/* Main Content */}
        <div className="flex-1 p-6 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Knowledge Base Management</h1>
              <p className="text-gray-600 mt-1">Create and manage support articles for your team and customers</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Import Articles
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                <Plus className="w-4 h-4 mr-2" />
                Create Article
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search articles, tags, or content..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      {category.name} ({category.count})
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Knowledge Base Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Articles</p>
                    <p className="text-3xl font-bold text-blue-600">24</p>
                  </div>
                  <BookOpen className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Published</p>
                    <p className="text-3xl font-bold text-green-600">18</p>
                  </div>
                  <Eye className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Views</p>
                    <p className="text-3xl font-bold text-purple-600">1.2k</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Helpful Votes</p>
                    <p className="text-3xl font-bold text-orange-600">284</p>
                  </div>
                  <MessageSquare className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Articles List */}
          <Card>
            <CardHeader>
              <CardTitle>Knowledge Base Articles</CardTitle>
              <CardDescription>Manage your support documentation and guides</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredArticles.map((article) => (
                  <div key={article.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{article.title}</h4>
                          <Badge className={getStatusColor(article.status)}>
                            {article.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{article.content}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span className="flex items-center">
                            <Users className="w-3 h-3 mr-1" />
                            {article.author}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {article.lastUpdated}
                          </span>
                          <span className="flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            {article.views} views
                          </span>
                          <span className="flex items-center">
                            <MessageSquare className="w-3 h-3 mr-1" />
                            {article.helpful} helpful
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {article.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              <Tag className="w-2 h-2 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
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

export default QaKnowledgeBasePage;
