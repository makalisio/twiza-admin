
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
import { format } from 'date-fns';

interface Donation {
  id: string;
  donor: string;
  email: string;
  amount: number;
  campaign: string;
  date: string;
}

interface RecentDonationsTableProps {
  donations: Donation[];
}

export const RecentDonationsTable: React.FC<RecentDonationsTableProps> = ({
  donations,
}) => {
  const { t } = useTranslation();

  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle>{t('recentDonations')}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('name')}</TableHead>
              <TableHead>{t('email')}</TableHead>
              <TableHead>{t('amount')}</TableHead>
              <TableHead>{t('campaign')}</TableHead>
              <TableHead>{t('date')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {donations.map((donation) => (
              <TableRow key={donation.id}>
                <TableCell className="font-medium">{donation.donor}</TableCell>
                <TableCell>{donation.email}</TableCell>
                <TableCell>${donation.amount}</TableCell>
                <TableCell>{donation.campaign}</TableCell>
                <TableCell>{format(new Date(donation.date), 'dd/MM/yyyy')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
