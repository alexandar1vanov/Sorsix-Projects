import {Episode} from './Episode';

export interface Season{
  "Title": string,
  "Season": number,
  "totalSeasons": number,
  "Episodes": Episode[],
}
