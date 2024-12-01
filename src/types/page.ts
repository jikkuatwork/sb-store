export interface Author {
  name: string;
  photoUrl: string;
  profileUrl: string;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  lastUpdated: string;
  publishDate: string;
  author: Author;
  coverImageUrl: string;
}

export type NewPage = Omit<Page, 'id' | 'lastUpdated'>;