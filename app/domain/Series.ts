// @ts-ignore
import {API_KEY} from '@env'

export type WatchProvider = {
    lang: string;
    flatrate: {
        logo_path: string;
        provider_name: string;
        display_priority: number
    }[]
};

export type Seasons = {
    id: number;
    name: string;
    poster_path: string;
    season_number: number;
}

export type Series = {
    id: number;
    poster_path: string;
    backdrop_path: string;
    name: string;
    original_name: string;
    number_of_seasons: number;
    seasons: Seasons[];
    providers: WatchProvider[];
    actors: string[];
    directors: string[];
}

export async function fetchSeries(id: string): Promise<Series> {
    const resp = await fetch("https://api.themoviedb.org/3/tv/" + id + "?api_key=" + API_KEY + "&language=fr-FR");
    const data: Series = await resp.json();

    const providersResp = await fetch("https://api.themoviedb.org/3/tv/" + id + "/watch/providers?api_key=" + API_KEY);
    const providers = await providersResp.json();
    data.providers = [];

    Object.keys(providers.results).forEach(key => {
        const watch: WatchProvider = providers.results[key];
        watch.lang = key;
        data.providers.push(watch);
    });

    const creditsResponse = await fetch("https://api.themoviedb.org/3/tv/" + id + "/credits?api_key=" + API_KEY);
    const credits = await creditsResponse.json();

    data.actors = credits.cast.slice(0, 3).map(cast => cast.name);
    data.directors = credits.crew.filter(crew => crew.job === "Director").map(crew => crew.name);


    return data;
}