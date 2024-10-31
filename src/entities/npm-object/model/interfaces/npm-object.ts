export interface NpmObject {
  package: Package;
  flags?: Flags;
  score: Score;
  searchScore: number;
}
export interface Package {
  name: string;
  scope: string;
  version: string;
  description: string;
  keywords?: (string)[] | null;
  date: string;
  links?: Links;
  publisher?: MaintainersEntityOrPublisher;
  maintainers?: (MaintainersEntityOrPublisher)[] | null;
}
export interface Links {
  npm: string;
  homepage: string;
  repository: string;
}
export interface MaintainersEntityOrPublisher {
  username: string;
  email: string;
}
export interface Flags {
  insecure: number;
}
export interface Score {
  final: number;
  detail: Detail;
}
export interface Detail {
  quality: number;
  popularity: number;
  maintenance: number;
}