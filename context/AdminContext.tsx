
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Model, Club } from '../types';
import { DatabaseService } from '../services/database';

interface AdminContextType {
  models: Model[];
  clubs: Club[];
  loading: boolean;
  refreshData: () => Promise<void>;
  addModel: (model: Model) => Promise<void>;
  updateModel: (model: Model) => Promise<void>;
  deleteModel: (id: string) => Promise<void>;
  addClub: (club: Club) => Promise<void>;
  updateClub: (club: Club) => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [models, setModels] = useState<Model[]>([]);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshData = async () => {
    setLoading(true);
    const fetchedModels = await DatabaseService.getModels();
    const fetchedClubs = await DatabaseService.getClubs();
    setModels(fetchedModels);
    setClubs(fetchedClubs);
    setLoading(false);
  };

  useEffect(() => {
    refreshData();
  }, []);

  const addModel = async (model: Model) => {
    const success = await DatabaseService.addModel(model);
    if (success) await refreshData();
  };

  const updateModel = async (model: Model) => {
    const success = await DatabaseService.updateModel(model);
    if (success) await refreshData();
  };

  const deleteModel = async (id: string) => {
    const success = await DatabaseService.deleteModel(id);
    if (success) await refreshData();
  };

  const addClub = async (club: Club) => {
    const success = await DatabaseService.saveClub(club);
    if (success) await refreshData();
  };

  const updateClub = async (club: Club) => {
    const success = await DatabaseService.saveClub(club);
    if (success) await refreshData();
  };

  return (
    <AdminContext.Provider value={{ 
      models, clubs, loading, refreshData, addModel, updateModel, deleteModel, addClub, updateClub 
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within an AdminProvider');
  return context;
};
