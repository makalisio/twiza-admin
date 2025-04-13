
import React, { useState } from 'react';
import { useTranslation } from '@/utils/i18n';
import { AdminLayout } from '@/components/Layout';
import { RecentCampaignsTable } from '@/components/dashboard/RecentCampaignsTable';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, Plus } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

const mockCampaigns = [
  { id: '1', title: 'Aide aux sinistrés', creator: 'Jean Dupont', goal: 5000, raised: 2500, status: 'active' as const },
  { id: '2', title: 'Financement École', creator: 'Marie Curie', goal: 10000, raised: 8000, status: 'active' as const },
  { id: '3', title: 'Construction Hôpital', creator: 'Pierre Martin', goal: 50000, raised: 12000, status: 'pending' as const },
  { id: '4', title: 'Soutien Orphelinat', creator: 'Sophie Bernard', goal: 3000, raised: 3000, status: 'completed' as const },
  { id: '5', title: 'Matériel Sportif', creator: 'Ahmed Ali', goal: 2000, raised: 500, status: 'cancelled' as const },
  { id: '6', title: 'Aide humanitaire', creator: 'Emma Wilson', goal: 15000, raised: 7500, status: 'active' as const },
  { id: '7', title: 'Recherche médicale', creator: 'Robert Johnson', goal: 20000, raised: 5000, status: 'pending' as const },
  { id: '8', title: 'Accès à l\'eau potable', creator: 'Yasmine Khan', goal: 8000, raised: 8000, status: 'completed' as const },
  { id: '9', title: 'Programme d\'éducation', creator: 'David Chen', goal: 12000, raised: 4000, status: 'active' as const },
  { id: '10', title: 'Aide aux personnes âgées', creator: 'Nicole Garcia', goal: 6000, raised: 1000, status: 'cancelled' as const },
];

const Campaigns = () => {
  const { t } = useTranslation();
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         campaign.creator.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Campaign action handlers
  const handleViewCampaign = (id: string) => {
    toast.info(`Viewing campaign ${id}`);
  };

  const handleApproveCampaign = (id: string) => {
    setCampaigns(
      campaigns.map((campaign) =>
        campaign.id === id
          ? { ...campaign, status: 'active' as const }
          : campaign
      )
    );
    toast.success(`Campaign ${id} approved`);
  };

  const handleRejectCampaign = (id: string) => {
    setCampaigns(
      campaigns.map((campaign) =>
        campaign.id === id
          ? { ...campaign, status: 'cancelled' as const }
          : campaign
      )
    );
    toast.success(`Campaign ${id} rejected`);
  };

  const handleDeleteCampaign = (id: string) => {
    setCampaigns(campaigns.filter((campaign) => campaign.id !== id));
    toast.success(`Campaign ${id} deleted`);
  };

  return (
    <AdminLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">{t('campaigns')}</h1>
          <Button className="bg-twiza hover:bg-twiza-dark">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter une campagne
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher des campagnes..."
              className="pl-8"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="active">Actif</SelectItem>
                <SelectItem value="completed">Terminé</SelectItem>
                <SelectItem value="cancelled">Annulé</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <RecentCampaignsTable
          campaigns={filteredCampaigns}
          onViewCampaign={handleViewCampaign}
          onApproveCampaign={handleApproveCampaign}
          onRejectCampaign={handleRejectCampaign}
          onDeleteCampaign={handleDeleteCampaign}
        />
      </div>
    </AdminLayout>
  );
};

export default Campaigns;
