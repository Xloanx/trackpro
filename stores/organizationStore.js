import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// export interface Organization {
//   id: string;
//   name: string;
//   type: string;
//   status: 'active' | 'inactive' | 'suspended';
//   memberCount: number;
//   ticketCount: number;
//   description?: string;
//   lastAccessed?: string;
//   isFavorite?: boolean;
//   healthScore?: number;
//   monthlyGrowth?: number;
// }

// interface OrganizationState {
//   // Current organization context
//   currentOrganization: Organization | null;
  
//   // All organizations the user has access to
//   organizations: Organization[];
  
//   // Loading states
//   isLoading: boolean;
  
//   // Search and filter states
//   searchTerm: string;
//   selectedFilter: string;
  
//   // Actions
//   setCurrentOrganization: (organization: Organization | null) => void;
//   setOrganizations: (organizations: Organization[]) => void;
//   switchToOrganization: (organizationId: string) => void;
//   updateOrganization: (organizationId: string, updates: Partial<Organization>) => void;
//   toggleFavorite: (organizationId: string) => void;
//   updateLastAccessed: (organizationId: string) => void;
//   setSearchTerm: (term: string) => void;
//   setSelectedFilter: (filter: string) => void;
//   setLoading: (loading: boolean) => void;
  
//   // Computed getters
//   getFilteredOrganizations: () => Organization[];
//   getFavoriteOrganizations: () => Organization[];
//   getRecentOrganizations: () => Organization[];
// }

// Mock data - will be replaced with API calls
const mockOrganizations = [
  {
    id: "org-001",
    name: "TechCorp Solutions",
    type: "Technology",
    status: "active",
    memberCount: 25,
    ticketCount: 156,
    description: "Leading software development company",
    lastAccessed: "2 hours ago",
    isFavorite: true,
    healthScore: 95,
    monthlyGrowth: 12
  },
  {
    id: "org-002", 
    name: "RetailMax Inc",
    type: "Retail",
    status: "active",
    memberCount: 18,
    ticketCount: 89,
    description: "E-commerce and retail solutions",
    lastAccessed: "1 day ago",
    isFavorite: false,
    healthScore: 87,
    monthlyGrowth: 8
  },
  {
    id: "org-003",
    name: "HealthFirst Medical",
    type: "Healthcare", 
    status: "active",
    memberCount: 32,
    ticketCount: 204,
    description: "Healthcare services and medical solutions",
    lastAccessed: "3 days ago",
    isFavorite: true,
    healthScore: 92,
    monthlyGrowth: 15
  },
  {
    id: "org-004",
    name: "EduLearn Academy",
    type: "Education",
    status: "inactive",
    memberCount: 12,
    ticketCount: 45,
    description: "Online education platform",
    lastAccessed: "1 week ago",
    isFavorite: false,
    healthScore: 73,
    monthlyGrowth: -2
  }
];

export const useOrganizationStore = create()(
  persist(
    (set, get) => ({
      // Initial state
      currentOrganization: null,
      organizations: mockOrganizations,
      isLoading: false,
      searchTerm: "",
      selectedFilter: "all",

      // Actions
      setCurrentOrganization: (organization) => {
        set({ currentOrganization: organization });
        if (organization) {
          get().updateLastAccessed(organization.id);
        }
      },

      setOrganizations: (organizations) => {
        set({ organizations });
      },

      switchToOrganization: (organizationId) => {
        const organization = get().organizations.find(org => org.id === organizationId);
        if (organization) {
          get().setCurrentOrganization(organization);
        }
      },

      updateOrganization: (organizationId, updates) => {
        set(state => ({
          organizations: state.organizations.map(org =>
            org.id === organizationId ? { ...org, ...updates } : org
          )
        }));
        
        // Update current organization if it's the one being updated
        const currentOrg = get().currentOrganization;
        if (currentOrg && currentOrg.id === organizationId) {
          set({ currentOrganization: { ...currentOrg, ...updates } });
        }
      },

      toggleFavorite: (organizationId) => {
        const org = get().organizations.find(o => o.id === organizationId);
        if (org) {
          get().updateOrganization(organizationId, { isFavorite: !org.isFavorite });
        }
      },

      updateLastAccessed: (organizationId) => {
        const now = new Date();
        const timeString = now.getHours() < 1 ? "Just now" : 
                          now.getHours() < 24 ? `${now.getHours()} hours ago` : 
                          `${Math.floor(now.getHours() / 24)} days ago`;
        
        get().updateOrganization(organizationId, { lastAccessed: timeString });
      },

      setSearchTerm: (term) => {
        set({ searchTerm: term });
      },

      setSelectedFilter: (filter) => {
        set({ selectedFilter: filter });
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      },

      // Computed getters
      getFilteredOrganizations: () => {
        const { organizations, searchTerm, selectedFilter } = get();
        
        let filtered = organizations.filter(org => {
          const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                               org.type.toLowerCase().includes(searchTerm.toLowerCase());
          return matchesSearch;
        });

        switch (selectedFilter) {
          case "favorites":
            filtered = filtered.filter(org => org.isFavorite);
            break;
          case "active":
            filtered = filtered.filter(org => org.status === "active");
            break;
          case "recent":
            filtered = filtered.filter(org => org.lastAccessed);
            break;
          default:
            break;
        }

        // Sort by favorites first, then by last accessed
        return filtered.sort((a, b) => {
          if (a.isFavorite && !b.isFavorite) return -1;
          if (!a.isFavorite && b.isFavorite) return 1;
          return 0;
        });
      },

      getFavoriteOrganizations: () => {
        return get().organizations.filter(org => org.isFavorite);
      },

      getRecentOrganizations: () => {
        return get().organizations
          .filter(org => org.lastAccessed)
          .slice(0, 4);
      }
    }),
    {
      name: 'organization-storage',
      partialize: (state) => ({
        currentOrganization: state.currentOrganization,
        organizations: state.organizations
      })
    }
  )
);
