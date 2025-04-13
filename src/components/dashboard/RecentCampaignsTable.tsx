
import React from 'react';
import { useTranslation } from '@/utils/i18n';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye, Check, X, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Campaign {
  id: string;
  title: string;
  creator: string;
  goal: number;
  raised: number;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
}

interface RecentCampaignsTableProps {
  campaigns: Campaign[];
  onViewCampaign: (id: string) => void;
  onApproveCampaign: (id: string) => void;
  onRejectCampaign: (id: string) => void;
  onDeleteCampaign: (id: string) => void;
}

export const RecentCampaignsTable: React.FC<RecentCampaignsTableProps> = ({
  campaigns,
  onViewCampaign,
  onApproveCampaign,
  onRejectCampaign,
  onDeleteCampaign,
}) => {
  const { t } = useTranslation();

  const getStatusBadge = (status: Campaign['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">{t('pending')}</Badge>;
      case 'active':
        return <Badge variant="outline" className="bg-green-100 text-green-800">{t('active')}</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">{t('completed')}</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-100 text-red-800">{t('cancelled')}</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle>{t('recentCampaigns')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('title')}</TableHead>
              <TableHead>{t('creator')}</TableHead>
              <TableHead>{t('goal')}</TableHead>
              <TableHead>{t('raised')}</TableHead>
              <TableHead>{t('status')}</TableHead>
              <TableHead className="text-right">{t('actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.map((campaign) => (
              <TableRow key={campaign.id}>
                <TableCell className="font-medium">{campaign.title}</TableCell>
                <TableCell>{campaign.creator}</TableCell>
                <TableCell>${campaign.goal}</TableCell>
                <TableCell>${campaign.raised}</TableCell>
                <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewCampaign(campaign.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {campaign.status === 'pending' && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-green-600"
                          onClick={() => onApproveCampaign(campaign.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600"
                          onClick={() => onRejectCampaign(campaign.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600"
                      onClick={() => onDeleteCampaign(campaign.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
