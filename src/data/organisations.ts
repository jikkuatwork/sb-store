import { Organisation } from '../types/organisation';
import { generateOrgId } from '../utils/formatters';

export const organisations: Organisation[] = [
  {
    id: generateOrgId(),
    name: 'Acme Corporation',
    userCount: 150,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-03-10T15:45:00Z'
  },
  {
    id: generateOrgId(),
    name: 'TechStart Inc',
    userCount: 75,
    createdAt: '2024-02-01T08:20:00Z',
    updatedAt: '2024-03-12T11:30:00Z'
  },
  {
    id: generateOrgId(),
    name: 'Global Systems',
    userCount: 300,
    createdAt: '2023-11-20T14:15:00Z',
    updatedAt: '2024-03-08T09:20:00Z'
  },
  {
    id: generateOrgId(),
    name: 'Digital Solutions',
    userCount: 120,
    createdAt: '2024-01-05T16:45:00Z',
    updatedAt: '2024-03-11T13:10:00Z'
  },
  {
    id: generateOrgId(),
    name: 'Future Labs',
    userCount: 90,
    createdAt: '2024-02-10T09:00:00Z',
    updatedAt: '2024-03-09T16:30:00Z'
  }
];