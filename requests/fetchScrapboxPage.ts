export interface Response {
  id: string;
  title: string;
  image: string;
  descriptions: string[];
  user: User;
  pin: number;
  views: number;
  linked: number;
  commitId: string;
  created: number;
  updated: number;
  accessed: number;
  snapshotCreated: number;
  snapshotCount: number;
  pageRank: number;
  lastAccessed: number;
  persistent: boolean;
  lines: Line[];
  links: string[];
  projectLinks: any[];
  icons: any[];
  files: string[];
  relatedPages: RelatedPages;
  collaborators: Collaborator[];
}

export const fetchScrapboxPage = async (path: string) => {
  const url = `https://scrapbox.io/api/pages/iwsq/${encodeURIComponent(path)}`;
  const res: Response = await fetch(url).then((r) => r.json());
  return res;
};

interface User {
  id: string;
  name: string;
  displayName: string;
  photo: string;
}

interface Line {
  id: string;
  text: string;
  userId: string;
  created: number;
  updated: number;
}

interface LinksHop {
  id: string;
  title: string;
  titleLc: string;
  image: string | null;
  descriptions: string[];
  linksLc: string[];
  linked: number;
  updated: number;
  accessed: number;
}

interface RelatedPages {
  links1hop: LinksHop[];
  links2hop: LinksHop[];
  projectLinks1hop: any[];
  hasBackLinksOrIcons: boolean;
}

interface Collaborator {
  id: string;
  name: string;
  displayName: string;
  photo: string;
}
