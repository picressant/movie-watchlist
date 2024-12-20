// @ts-ignore
import { API_KEY } from '@env';

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
    overview: string;
    providers: WatchProvider[];
    actors: string[];
    directors: string[];
    episodes: any[];
    backdrop_path: string;
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

export async function fetchSeries(id: string, withSeasons: boolean = false): Promise<Series> {
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

    if (withSeasons && data.number_of_seasons && data.number_of_seasons > 0) {
        data.seasons = await Promise.all(Array.from({length: data.number_of_seasons}, (_, i) => fetchSeason((i + 1).toString(), id, data)));
    }

    // console.log(data);

    return data;
}

async function fetchSeason(number: string, seriesId: string, serie: Series): Promise<Seasons> {
    const resp = await fetch("https://api.themoviedb.org/3/tv/" + seriesId + "/season/" + number + "?api_key=" + API_KEY + "&language=fr-FR");
    const data: Seasons = await resp.json();

    const providersResp = await fetch("https://api.themoviedb.org/3/tv/" + seriesId + "/season/" + number + "/watch/providers?api_key=" + API_KEY);
    const providers = await providersResp.json();
    data.providers = [];

    Object.keys(providers.results).forEach(key => {
        const watch: WatchProvider = providers.results[key];
        watch.lang = key;
        data.providers.push(watch);
    });

    const creditsResponse = await fetch("https://api.themoviedb.org/3/tv/" + seriesId + "/season/" + number + "/credits?api_key=" + API_KEY);
    const credits = await creditsResponse.json();

    data.actors = credits.cast.slice(0, 3).map(cast => cast.name);
    data.directors = credits.crew.filter(crew => crew.job === "Director").map(crew => crew.name);

    data.backdrop_path = serie.backdrop_path;

    return data;
}
