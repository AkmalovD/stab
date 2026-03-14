const STORAGE_KEY = 'journeyProfilesMock';
const LAST_ID_KEY = 'journeyProfilesMockLastId';

export interface JourneyProfileData {
    id?: number;
    full_name: string;
    destination_country: string;
    intended_start_date: string;
    created_at?: string;
    updated_at?: string;
}

const isBrowser = typeof window !== 'undefined';

const readProfiles = (): JourneyProfileData[] => {
    if (!isBrowser) return [];

    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    try {
        return JSON.parse(raw) as JourneyProfileData[];
    } catch {
        return [];
    }
};

const writeProfiles = (profiles: JourneyProfileData[]) => {
    if (!isBrowser) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
};

const getNextId = (): number => {
    if (!isBrowser) return 1;

    const lastId = Number(localStorage.getItem(LAST_ID_KEY) || '0');
    const nextId = lastId + 1;
    localStorage.setItem(LAST_ID_KEY, String(nextId));
    return nextId;
};

export const journeyProfileApi = {
    create: async(data: JourneyProfileData) => {
        const now = new Date().toISOString();
        const profile: JourneyProfileData = {
            ...data,
            id: getNextId(),
            created_at: now,
            updated_at: now,
        };

        const profiles = readProfiles();
        profiles.push(profile);
        writeProfiles(profiles);
        return profile;
    },

    getAll: async () => {
        return readProfiles();
    },

    getById: async(id: number) => {
        const profile = readProfiles().find((item) => item.id === id);
        if (!profile) {
            throw new Error('Profile not found');
        }
        return profile;
    },

    update: async(id: number, data: JourneyProfileData) => {
        const profiles = readProfiles();
        const index = profiles.findIndex((item) => item.id === id);
        if (index === -1) {
            throw new Error('Profile not found');
        }

        const updatedProfile: JourneyProfileData = {
            ...profiles[index],
            ...data,
            id,
            updated_at: new Date().toISOString(),
        };
        profiles[index] = updatedProfile;
        writeProfiles(profiles);
        return updatedProfile;
    },

    delete: async(id: number) => {
        const profiles = readProfiles().filter((item) => item.id !== id);
        writeProfiles(profiles);
    }
}