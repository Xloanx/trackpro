
import { useOrganizationStore, Organization } from '@/stores/organizationStore';
import { useRouter } from 'next/navigation';

export const useOrganization = () => {
  const router = useRouter();
  const store = useOrganizationStore();

  const selectOrganization = (organizationId) => {
    console.log('Selecting organization:', organizationId);
    store.switchToOrganization(organizationId);
    router.push('/qa/dashboard');
  };

  const switchOrganization = (organizationId) => {
    console.log('Switching to organization:', organizationId);
    store.switchToOrganization(organizationId);
  };

  return {
    // State
    currentOrganization: store.currentOrganization,
    organizations: store.organizations,
    isLoading: store.isLoading,
    searchTerm: store.searchTerm,
    selectedFilter: store.selectedFilter,
    
    // Computed values
    filteredOrganizations: store.getFilteredOrganizations(),
    favoriteOrganizations: store.getFavoriteOrganizations(),
    recentOrganizations: store.getRecentOrganizations(),
    
    // Actions
    selectOrganization,
    switchOrganization,
    setCurrentOrganization: store.setCurrentOrganization,
    updateOrganization: store.updateOrganization,
    toggleFavorite: store.toggleFavorite,
    setSearchTerm: store.setSearchTerm,
    setSelectedFilter: store.setSelectedFilter,
    setLoading: store.setLoading,
  };
};
