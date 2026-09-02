import { DestinationListing } from '@/data/destinationsListData';
import { api } from '@/lib/api';
import { City, Scholarship } from '@/types';

export interface ScholarshipFilterOptions {
    countries: string[];
    studyLevels: string[];
    coverageTypes: string[];
    fieldsOfStudy: string[];
}

export const destinationsApi = {
    list: async () => {
        const response = await api.get<DestinationListing[]>('/destinations');
        return response.data;
    },
};

export const citiesApi = {
    list: async () => {
        const response = await api.get<City[]>('/cities');
        return response.data;
    },
};

export const scholarshipsApi = {
    list: async () => {
        const response = await api.get<Scholarship[]>('/scholarships');
        return response.data;
    },

    filters: async () => {
        const response = await api.get<ScholarshipFilterOptions>('/scholarships/filters');
        return response.data;
    },
};
