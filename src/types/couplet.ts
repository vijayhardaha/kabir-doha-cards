export type Couplet = string;

export type CoupletList = Couplet[];

export interface FetchCoupletsResponse {
  data: CoupletList;
  error: string | null;
}
