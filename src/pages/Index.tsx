
import React, { useState } from 'react';
import { useTranslation } from '@/utils/i18n';
import { AdminLayout } from '@/components/Layout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { RecentCampaignsTable } from '@/components/dashboard/RecentCampaignsTable';
import { RecentDonationsTable } from '@/components/dashboard/RecentDonationsTable';
import { DonationsChart } from '@/components/dashboard/DonationsChart';
import { LayoutDashboard, Flag, DollarSign, Users } from 'lucide-react';
import { toast } from 'sonner';

// Mock data for the dashboard
const mockCampaigns = [
  { id: '1', title: 'Aide aux sinistrés', creator: 'Jean Dupont', goal: 5000, raised: 2500, status: 'active' as const },
  { id: '2', title: 'Financement École', creator: 'Marie Curie', goal: 10000, raised: 8000, status: 'active' as const },
  { id: '3', title: 'Construction Hôpital', creator: 'Pierre Martin', goal: 50000, raised: 12000, status: 'pending' as const },
  { id: '4', title: 'Soutien Orphelinat', creator: 'Sophie Bernard', goal: 3000, raised: 3000, status: 'completed' as const },
  { id: '5', title: 'Matériel Sportif', creator: 'Ahmed Ali', goal: 2000, raised: 500, status: 'cancelled' as const },
];

const mockDonations = [
  { id: '1', donor: 'Paul Durand', email: 'paul@example.com', amount: 100, campaign: 'Aide aux sinistrés', date: '2023-04-01T12:00:00Z' },
  { id: '2', donor: 'Lucie Petit', email: 'lucie@example.com', amount: 250, campaign: 'Financement École', date: '2023-04-02T14:30:00Z' },
  { id: '3', donor: 'Karim Benzema', email: 'karim@example.com', amount: 500, campaign: 'Construction Hôpital', date: '2023-04-05T09:15:00Z' },
  { id: '4', donor: 'Fatima Hassan', email: 'fatima@example.com', amount: 75, campaign: 'Soutien Orphelinat', date: '2023-04-08T18:45:00Z' },
  { id: '5', donor: 'Thomas Blanc', email: 'thomas@example.com', amount: 120, campaign: 'Matériel Sportif', date: '2023-04-10T11:20:00Z' },
];

const chartData = [
  { name: 'Jan', amount: 4000 },
  { name: 'Feb', amount: 3000 },
  { name: 'Mar', amount: 5000 },
  { name: 'Apr', amount: 8000 },
  { name: 'May', amount: 6000 },
  { name: 'Jun', amount: 9500 },
  { name: 'Jul', amount: 11000 },
];

const Index = () => {
  const { t } = useTranslation();
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  const [donations] = useState(mockDonations);

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
        <h1 className="text-3xl font-bold">{t('welcome')}</h1>
        <p className="text-muted-foreground">
          {t('lastUpdated')}: {new Date().toLocaleDateString()}
        </p>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title={t('totalCampaigns')}
            value={campaigns.length}
            icon={Flag}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title={t('activeCampaigns')}
            value={campaigns.filter((c) => c.status === 'active').length}
            icon={Flag}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title={t('totalDonations')}
            value="$21,450"
            icon={DollarSign}
            trend={{ value: 5, isPositive: true }}
          />
          <StatsCard
            title={t('todayDonations')}
            value="$1,250"
            icon={DollarSign}
            description={t('thisMonth')}
          />
        </div>

        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
          <DonationsChart data={chartData} />
          <RecentDonationsTable donations={donations} />
        </div>

        <RecentCampaignsTable
          campaigns={campaigns}
          onViewCampaign={handleViewCampaign}
          onApproveCampaign={handleApproveCampaign}
          onRejectCampaign={handleRejectCampaign}
          onDeleteCampaign={handleDeleteCampaign}
        />
      </div>
    </AdminLayout>
  );
};

export default Index;
