'use client'
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Zap,
  Building,
  Users,
  TicketIcon,
  ArrowRight,
  ChevronRight,
  Search,
  Clock,
  TrendingUp,
  AlertCircle,
  Star
} from "lucide-react";
import Link from "next/link";
import { useOrganization } from "@/hooks/useOrganization";
import { QAWelcomeMessage } from "./components/qaWelcomeMessage";
import { QAOrganizationQuickActions } from "./components/qaOrganizationQuickActions";

const QaOrganizationSelectionPage = () => {
  const {
    organizations,
    isLoading,
    searchTerm,
    selectedFilter,
    filteredOrganizations,
    favoriteOrganizations,
    recentOrganizations,
    selectOrganization,
    toggleFavorite,
    setSearchTerm,
    setSelectedFilter
  } = useOrganization();

  // Sort organizations by favorites first, then by last accessed
  const sortedOrganizations = [...filteredOrganizations].sort((a, b) => {
    if (a.isFavorite && !b.isFavorite) return -1;
    if (!a.isFavorite && b.isFavorite) return 1;
    return 0;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'suspended': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getHealthScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleFavoriteToggle = (e, organizationId) => {
    e.stopPropagation();
    toggleFavorite(organizationId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading organizations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b backdrop-blur-sm bg-white/95">
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
            <div className="text-sm text-gray-600">
              Welcome back! Select your organization to continue.
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <QAWelcomeMessage 
          userName="Admin"
          isFirstTime={organizations.length <= 2}
          organizationCount={organizations.length}
        />

        {/* Search and Filter Bar */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Select Your Organization
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            You manage multiple organizations. Choose the one you'd like to work with today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search organizations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'favorites', 'active', 'recent'].map((filter) => (
                <Button
                  key={filter}
                  variant={selectedFilter === filter ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFilter(filter)}
                  className="capitalize"
                >
                  {filter === 'all' ? 'All' : filter}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Organizations Section */}
        {selectedFilter === 'all' && recentOrganizations.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-blue-600" />
              Recently Accessed
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {recentOrganizations.slice(0, 4).map((org) => (
                <Card 
                  key={org.id} 
                  className="hover:shadow-md transition-all duration-200 cursor-pointer border-l-4 border-l-blue-500"
                  onClick={() => selectOrganization(org.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-sm truncate">{org.name}</h3>
                      <button
                        onClick={(e) => handleFavoriteToggle(e, org.id)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Star className={`w-4 h-4 ${org.isFavorite ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">{org.lastAccessed}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Organizations Grid */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Building className="w-5 h-5 mr-2 text-blue-600" />
            {selectedFilter === 'all' ? 'All Organizations' : 
             selectedFilter === 'favorites' ? 'Favorite Organizations' :
             selectedFilter === 'active' ? 'Active Organizations' : 'Recently Accessed'}
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({sortedOrganizations.length})
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedOrganizations.map((org) => (
            <Card 
              key={org.id} 
              className="hover:shadow-xl transition-all duration-300 cursor-pointer group border-0 shadow-md hover:scale-105"
              onClick={() => selectOrganization(org.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Building className="w-5 h-5 text-blue-600" />
                    <Badge className={`${getStatusColor(org.status)} text-xs`}>
                      {org.status}
                    </Badge>
                    <button
                      onClick={(e) => handleFavoriteToggle(e, org.id)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <Star className={`w-4 h-4 ${org.isFavorite ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
                    </button>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
                <CardTitle className="text-xl group-hover:text-blue-700 transition-colors">
                  {org.name}
                </CardTitle>
                <CardDescription className="line-clamp-2">{org.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Key Metrics Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">{org.memberCount}</p>
                      <p className="text-xs text-gray-500">Team Members</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TicketIcon className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium">{org.ticketCount}</p>
                      <p className="text-xs text-gray-500">Active Tickets</p>
                    </div>
                  </div>
                </div>

                {/* Health Score and Growth */}
                <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className={`w-4 h-4 ${getHealthScoreColor(org.healthScore || 0)}`} />
                    <div>
                      <p className={`text-sm font-medium ${getHealthScoreColor(org.healthScore || 0)}`}>
                        {org.healthScore}%
                      </p>
                      <p className="text-xs text-gray-500">Health Score</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className={`w-4 h-4 ${org.monthlyGrowth && org.monthlyGrowth > 0 ? 'text-green-600' : 'text-red-600'}`} />
                    <div>
                      <p className={`text-sm font-medium ${org.monthlyGrowth && org.monthlyGrowth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {org.monthlyGrowth && org.monthlyGrowth > 0 ? '+' : ''}{org.monthlyGrowth}%
                      </p>
                      <p className="text-xs text-gray-500">Monthly Growth</p>
                    </div>
                  </div>
                </div>

                {/* Organization Type and Last Access */}
                <div className="flex items-center justify-between text-sm pt-2 border-t">
                  <span className="text-gray-600">{org.type}</span>
                  {org.lastAccessed && (
                    <span className="text-gray-500 text-xs">Last: {org.lastAccessed}</span>
                  )}
                </div>

                {/* Action Button */}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full group-hover:bg-blue-50 group-hover:border-blue-200 group-hover:text-blue-700 transition-all"
                >
                  Access Dashboard
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {sortedOrganizations.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Building className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              {searchTerm ? 'No matching organizations found' : 'No Organizations Found'}
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              {searchTerm 
                ? `No organizations match "${searchTerm}". Try adjusting your search terms.`
                : "You don't have access to any organizations yet. Contact your administrator for access."
              }
            </p>
            {searchTerm && (
              <Button 
                variant="outline" 
                onClick={() => setSearchTerm("")}
              >
                Clear Search
              </Button>
            )}
          </div>
        )}

        {/* Quick Actions */}
        <QAOrganizationQuickActions 
          onCreateOrganization={() => console.log('Create organization')}
          onViewAnalytics={() => console.log('View analytics')}
          onOpenSettings={() => console.log('Open settings')}
          onGetHelp={() => console.log('Get help')}
        />

        {/* Quick Stats Footer */}
        <div className="mt-12 bg-white rounded-lg shadow-sm border p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">{organizations.length}</p>
              <p className="text-sm text-gray-600">Total Organizations</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {organizations.filter(org => org.status === 'active').length}
              </p>
              <p className="text-sm text-gray-600">Active Organizations</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">
                {organizations.reduce((sum, org) => sum + org.memberCount, 0)}
              </p>
              <p className="text-sm text-gray-600">Total Team Members</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-600">
                {organizations.reduce((sum, org) => sum + org.ticketCount, 0)}
              </p>
              <p className="text-sm text-gray-600">Total Active Tickets</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QaOrganizationSelectionPage;
