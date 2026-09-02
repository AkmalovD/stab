import { api } from '@/lib/api';

export interface UserProfileData {
    uid: string;
    email: string;
    displayName?: string;
    photoURL?: string;
    dateOfBirth?: string;
    location?: string;
    university?: string;
    major?: string;
    studyDestination?: string;
    targetUniversity?: string;
    budget?: string;
    startDate?: string;
    bio?: string;
    createdAt?: string;
    updatedAt?: string;
}

export type UserProfileUpdate = Partial<
    Omit<UserProfileData, 'uid' | 'email' | 'createdAt' | 'updatedAt'>
>;

export const userProfileApi = {
    get: async () => {
        const response = await api.get<UserProfileData>('/me/profile');
        return response.data;
    },

    update: async (patch: UserProfileUpdate) => {
        const response = await api.patch<UserProfileData>('/me/profile', patch);
        return response.data;
    },
};
