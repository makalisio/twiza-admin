import React, { useEffect, useState } from 'react';
import { useTranslation } from '@/utils/i18n';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { DonationsChart } from '@/components/dashboard/DonationsChart';
import { RecentCampaignsTable } from '@/components/dashboard/RecentCampaignsTable';
import { Users, DollarSign, TrendingUp, Package } from 'lucide-react';

interface DashboardData {
  totalUsers: number;
  totalDonations: number;
  activeCampaigns: number;
  totalCampaigns: number;
  donationsData: Array<{ name: string; amount: number }>;
  recentCampaigns: Array<{
    id: string;
    title: string;
    creator: string;
    goal: number;
    raised: number;
    status: 'pending' | 'active' | 'completed' | 'cancelled';
  }>;
}

export const DashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const [data, setData] = useState<DashboardData>({
    totalUsers: 0,
    totalDonations: 0,
    activeCampaigns: 0,
    totalCampaigns: 0,
    donationsData: [],
    recentCampaigns: [],
  });

  useEffect(() => {
    // TODO: Remplacer par un appel API réel
    const fetchDashboardData = async () => {
      try {
        // Exemple de données statiques pour la démonstration
        const mockData: DashboardData = {
          totalUsers: 1234,
          totalDonations: 56789,
          activeCampaigns: 12,
          totalCampaigns: 45,
          donationsData: [
            { name: 'Jan', amount: 4000 },
            { name: 'Fév', amount: 3000 },
            { name: 'Mar', amount: 5000 },
            { name: 'Avr', amount: 2780 },
            { name: 'Mai', amount: 1890 },
            { name: 'Juin', amount: 2390 },
          ],
          recentCampaigns: [
            {
              id: '1',
              title: 'Campagne 1',
              creator: 'John Doe',
              goal: 5000,
              raised: 3000,
              status: 'active',
            },
            {
              id: '2',
              title: 'Campagne 2',
              creator: 'Jane Smith',
              goal: 10000,
              raised: 8000,
              status: 'pending',
            },
          ],
        };
        setData(mockData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  const handleViewCampaign = (id: string) => {
    console.log('View campaign:', id);
  };

  const handleApproveCampaign = (id: string) => {
    console.log('Approve campaign:', id);
  };

  const handleRejectCampaign = (id: string) => {
    console.log('Reject campaign:', id);
  };

  const handleDeleteCampaign = (id: string) => {
    console.log('Delete campaign:', id);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">{t('welcome')}</h1>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title={t('totalUsers')}
          value={data.totalUsers}
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title={t('totalDonations')}
          value={`$${data.totalDonations.toLocaleString()}`}
          icon={DollarSign}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title={t('activeCampaigns')}
          value={data.activeCampaigns}
          icon={TrendingUp}
          trend={{ value: 5, isPositive: true }}
        />
        <StatsCard
          title={t('totalCampaigns')}
          value={data.totalCampaigns}
          icon={Package}
          trend={{ value: 3, isPositive: true }}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg border bg-card p-4">
          <DonationsChart data={data.donationsData} />
        </div>
      </div>

      <div className="rounded-lg border bg-card">
        <RecentCampaignsTable
          campaigns={data.recentCampaigns}
          onViewCampaign={handleViewCampaign}
          onApproveCampaign={handleApproveCampaign}
          onRejectCampaign={handleRejectCampaign}
          onDeleteCampaign={handleDeleteCampaign}
        />
      </div>
    </div>
  );
}; 