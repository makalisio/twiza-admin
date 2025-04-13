
import React, { useState } from 'react';
import { useTranslation } from '@/utils/i18n';
import { AdminLayout } from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MoreHorizontal, UserPlus } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

// Mock data
const mockUsers = [
  { id: '1', name: 'Jean Dupont', email: 'jean@example.com', role: 'admin', status: 'active', campaigns: 3, donations: 5, initials: 'JD', image: '' },
  { id: '2', name: 'Marie Curie', email: 'marie@example.com', role: 'user', status: 'active', campaigns: 2, donations: 10, initials: 'MC', image: '' },
  { id: '3', name: 'Pierre Martin', email: 'pierre@example.com', role: 'user', status: 'inactive', campaigns: 1, donations: 2, initials: 'PM', image: '' },
  { id: '4', name: 'Sophie Bernard', email: 'sophie@example.com', role: 'user', status: 'active', campaigns: 0, donations: 8, initials: 'SB', image: '' },
  { id: '5', name: 'Ahmed Ali', email: 'ahmed@example.com', role: 'user', status: 'active', campaigns: 1, donations: 3, initials: 'AA', image: '' },
  { id: '6', name: 'Emma Wilson', email: 'emma@example.com', role: 'user', status: 'inactive', campaigns: 0, donations: 0, initials: 'EW', image: '' },
  { id: '7', name: 'Robert Johnson', email: 'robert@example.com', role: 'user', status: 'active', campaigns: 4, donations: 12, initials: 'RJ', image: '' },
  { id: '8', name: 'Yasmine Khan', email: 'yasmine@example.com', role: 'admin', status: 'active', campaigns: 2, donations: 7, initials: 'YK', image: '' },
];

const Users = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setUsers(users.filter(user => user.id !== id));
    toast.success(`User ${id} deleted`);
  };

  const handleChangeRole = (id: string, newRole: string) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, role: newRole } : user
    ));
    toast.success(`User ${id} role changed to ${newRole}`);
  };

  const handleChangeStatus = (id: string, newStatus: string) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, status: newStatus } : user
    ));
    toast.success(`User ${id} status changed to ${newStatus}`);
  };

  return (
    <AdminLayout>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">{t('users')}</h1>
          <Button className="bg-twiza hover:bg-twiza-dark">
            <UserPlus className="h-4 w-4 mr-2" />
            Ajouter un utilisateur
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher des utilisateurs..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Utilisateur</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Campagnes</TableHead>
                  <TableHead>Dons</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={user.image} />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {user.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {user.role === 'admin' ? (
                        <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                          Admin
                        </Badge>
                      ) : (
                        <Badge variant="outline">
                          User
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      {user.status === 'active' ? (
                        <Badge className="bg-green-100 text-green-800">
                          Active
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800">
                          Inactive
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>{user.campaigns}</TableCell>
                    <TableCell>{user.donations}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => toast.info(`Viewing user ${user.id}`)}>
                            Voir le profil
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleChangeRole(user.id, user.role === 'admin' ? 'user' : 'admin')}>
                            {user.role === 'admin' ? 'Rétrograder en utilisateur' : 'Promouvoir en admin'}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleChangeStatus(user.id, user.status === 'active' ? 'inactive' : 'active')}>
                            {user.status === 'active' ? 'Désactiver' : 'Activer'}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDelete(user.id)}
                          >
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Users;
