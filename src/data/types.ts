export interface Society {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  vision: string;
  mission: string;
  accentColor: string;
  logo: string;
  logoRotation?: string;
  heroImage?: string;
}

export interface Member {
  id: string;
  name: string;
  position: string;
  societyId: string | 'execom';
  year: number;
  photo: string;
  linkedin?: string;
  github?: string;
}

export interface Speaker {
  name: string;
  designation: string;
  bio: string;
  photo: string;
}

export interface AgendaItem {
  time: string;
  title: string;
  description?: string;
}

export interface Event {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string; // ISO 8601
  endDate?: string;
  venue: string;
  societyId: string;
  status: 'upcoming' | 'past' | 'featured';
  banner: string;
  tags: string[];
  speakers?: Speaker[];
  agenda?: AgendaItem[];
  gallery?: string[];
  registrationUrl?: string;
}

export interface Achievement {
  id: string;
  title: string;
  year: number;
  description: string;
  societyId?: string;
  tags: string[];
  images?: string[];
}
