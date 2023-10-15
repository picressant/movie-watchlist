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

export type Movie = {
    id: number;
    poster_path: string;
    backdrop_path: string;
    title: string;
    original_title: string;
    runtime: number;
    providers: WatchProvider[];
    favoriteCountryProviders: WatchProvider | undefined;
    actors: string[];
    directors: string[];
}

export async function fetchMovie(id: string, watchLang: string): Promise<Movie> {
    const resp = await fetch("https://api.themoviedb.org/3/movie/" + id + "?api_key=" + API_KEY + "&language=fr-FR");
    const data: Movie = await resp.json();

    const providersResp = await fetch("https://api.themoviedb.org/3/movie/" + id + "/watch/providers?api_key=" + API_KEY);
    const providers = await providersResp.json();
    data.providers = [];

    Object.keys(providers.results).forEach(key => {
        const watch: WatchProvider = providers.results[key];
        watch.lang = key;
        data.providers.push(watch);
    });
    data.favoriteCountryProviders = data.providers.find(p => p.lang === watchLang);

    const creditsResponse = await fetch("https://api.themoviedb.org/3/movie/" + id + "/credits?api_key=" + API_KEY);
    const credits = await creditsResponse.json();

    data.actors = credits.cast.slice(0, 3).map(cast => cast.name);
    data.directors = credits.crew.filter(crew => crew.job === "Director").map(crew => crew.name);


    return data;
}