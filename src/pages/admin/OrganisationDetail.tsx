import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Building2, Users, Calendar, UserPlus } from 'lucide-react';
import { organisations } from '../../data/organisations';
import { UsersTable } from '../../components/admin/UsersTable';
import { UserModal } from '../../components/admin/UserModal';
import type { User, NewUser } from '../../types/user';

// Sample users data - in a real app, this would come from an API
const sampleUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    added_on: '2024-02-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    added_on: '2024-03-01T15:45:00Z'
  }
];

export function OrganisationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [organisation, setOrganisation] = React.useState(organisations.find(o => o.id === id));
  const [users, setUsers] = React.useState<User[]>(sampleUsers);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [editingUser, setEditingUser] = React.useState<User | undefined>();

  if (!organisation) {
    return (
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center">
          <h2 className="text-lg font-medium text-gray-900">Organisation not found</h2>
          <p className="mt-2 text-sm text-gray-500">The organisation you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/admin/organisations')}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
          >
            Back to Organisations
          </button>
        </div>
      </div>
    );
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrganisation(prev => prev ? { ...prev, name: e.target.value } : prev);
  };

  const handleAddUser = (newUser: NewUser) => {
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      ...newUser,
      added_on: new Date().toISOString()
    };
    setUsers(prev => [...prev, user]);
  };

  const handleEditUser = (updatedUser: User) => {
    setUsers(prev => prev.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    ));
  };

  const handleRemoveUser = (userId: string) => {
    if (window.confirm('Are you sure you want to remove this user?')) {
      setUsers(prev => prev.filter(user => user.id !== userId));
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">{organisation.name}</h1>
        <p className="mt-1 text-sm text-gray-500">Organisation Details</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50">
              <Building2 className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Organisation ID</p>
              <p className="font-mono text-sm text-gray-500">{organisation.id}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50">
              <Users className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Total Users</p>
              <p className="font-mono text-sm text-gray-500">{organisation.userCount.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50">
              <Calendar className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Created On</p>
              <p className="font-mono text-sm text-gray-500">
                {new Date(organisation.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-medium text-gray-900">Organisation Settings</h2>
          <p className="mt-1 text-sm text-gray-500">Manage organisation details and preferences.</p>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-900">Organisation Name</label>
              <input
                type="text"
                value={organisation.name}
                onChange={handleNameChange}
                className="mt-1 block w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Users</h2>
            <p className="mt-1 text-sm text-gray-500">Manage users in this organisation.</p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
          >
            <UserPlus className="h-4 w-4" />
            Add User
          </button>
        </div>
        <div className="p-6">
          <UsersTable
            users={users}
            onEditUser={setEditingUser}
            onRemoveUser={handleRemoveUser}
          />
        </div>
      </div>

      <UserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddUser}
        title="Add New User"
      />

      <UserModal
        isOpen={!!editingUser}
        onClose={() => setEditingUser(undefined)}
        onSubmit={handleEditUser}
        user={editingUser}
        title="Edit User"
      />
    </div>
  );
}