
export type WatchProvider = {
    lang: string;
    flatrate: {
        logo_path: string;
        provider_name: string;
        display_priority: number
    }[]
};

export type Movie = {
    id: number;
    poster_path: string;
    title: string;
    original_title: string;
    runtime: number;
    providers: WatchProvider[];
    favoriteCountryProviders: WatchProvider | undefined;
}