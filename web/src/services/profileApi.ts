import { api } from '@/lib/api';

export interface JourneyProfileData {
    id?: number;
    full_name: string;
    destination_country: string;
    intended_start_date: string;
    created_at?: string;
    updated_at?: string;
}

export interface JourneyTaskData {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    priority: string;
    category: string;
}

export interface JourneyPhaseData {
    id: string;
    number: number;
    title: string;
    description: string;
    timeframe: string;
    status: string;
    icon: string;
    tasks: JourneyTaskData[];
}

export interface JourneyDocumentData {
    id: string;
    name: string;
    category: string;
    status: string;
    required: boolean;
    expiryDate?: string;
}

export const journeyProfileApi = {
    create: async (data: JourneyProfileData) => {
        const body = {
            full_name: data.full_name,
            destination_country: data.destination_country,
            intended_start_date: data.intended_start_date,
        };
        const response = await api.post<JourneyProfileData>('/journey-profiles', body);
        return response.data;
    },

    getAll: async () => {
        const response = await api.get<JourneyProfileData[]>('/journey-profiles');
        return response.data;
    },

    getById: async (id: number) => {
        const response = await api.get<JourneyProfileData>(`/journey-profiles/${id}`);
        return response.data;
    },

    update: async (id: number, data: JourneyProfileData) => {
        const body = {
            full_name: data.full_name,
            destination_country: data.destination_country,
            intended_start_date: data.intended_start_date,
        };
        const response = await api.put<JourneyProfileData>(`/journey-profiles/${id}`, body);
        return response.data;
    },

    delete: async (id: number) => {
        await api.delete(`/journey-profiles/${id}`);
    },
};

export const journeyApi = {
    getPhases: async (id: number) => {
        const response = await api.get<JourneyPhaseData[]>(`/journey-profiles/${id}/phases`);
        return response.data;
    },

    toggleTask: async (id: number, taskId: string, completed: boolean) => {
        const response = await api.patch<JourneyPhaseData[]>(
            `/journey-profiles/${id}/tasks/${taskId}`,
            { completed }
        );
        return response.data;
    },

    getDocuments: async (id: number) => {
        const response = await api.get<JourneyDocumentData[]>(`/journey-profiles/${id}/documents`);
        return response.data;
    },

    updateDocument: async (id: number, documentId: string, status: string) => {
        const response = await api.patch<JourneyDocumentData>(
            `/journey-profiles/${id}/documents/${documentId}`,
            { status }
        );
        return response.data;
    },
};
