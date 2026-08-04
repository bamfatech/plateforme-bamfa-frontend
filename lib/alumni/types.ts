export type RegistrationStatus = "en_attente" | "approuvee" | "rejetee";
export type ProfileStatus = "actif" | "suspendu" | "archive";
export type ProfileAction = "suspendre" | "reactiver" | "archiver" | "inviter";

export interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

/** Niveau public de l'annuaire. Les champs enrichis n'arrivent que pour un
 *  utilisateur connecté habilité — d'où leur caractère optionnel. */
export interface DirectoryEntry {
  id: number;
  first_name: string;
  last_name: string;
  promotion: number;
  sector: string;
  sector_display: string;
  country: string;
  current_position: string;
  organization: string;
  city?: string;
  bio?: string;
  linkedin_url?: string;
}

export interface AdminProfile {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  promotion: number;
  country: string;
  phone: string;
  city: string;
  university: string;
  mcf_program: string;
  sector: string;
  sector_display: string;
  current_position: string;
  organization: string;
  bio: string;
  linkedin_url: string;
  birth_date: string | null;
  gender: string;
  directory_consent: boolean;
  status: ProfileStatus;
  status_display: string;
  source: string;
  mandate: number | null;
  completeness: number;
  has_account: boolean;
  user_email: string | null;
  created_at: string;
  updated_at: string;
}

export interface Registration {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  promotion: number;
  country: string;
  phone: string;
  city: string;
  university: string;
  mcf_program: string;
  sector: string;
  sector_display: string;
  current_position: string;
  organization: string;
  bio: string;
  linkedin_url: string;
  birth_date: string | null;
  gender: string;
  directory_consent: boolean;
  status: RegistrationStatus;
  status_display: string;
  submitted_at: string;
  reviewed_at: string | null;
  reviewed_by_email: string | null;
  rejection_reason: string;
  profile: number | null;
}

export interface ImportReportError {
  id: number;
  line_number: number;
  raw_row: Record<string, string>;
  message: string;
}

export interface ImportReport {
  id: number;
  filename: string;
  strict: boolean;
  created_at: string;
  uploaded_by_email: string | null;
  rows_total: number;
  rows_created: number;
  rows_updated: number;
  rows_skipped: number;
  rows_failed: number;
  errors: ImportReportError[];
}

export interface DirectoryFilters {
  search?: string;
  promotion?: string;
  secteur?: string;
  pays?: string;
  page?: number;
  page_size?: number;
  ordering?: string;
}

export interface AdminProfileFilters extends DirectoryFilters {
  statut?: string;
  /** Filtre booléen côté API (`django_filters.BooleanFilter`) : `cleanParams`
   *  ne retire que `undefined`/`null`/`""`, jamais `false` — qui est une
   *  valeur de filtre à part entière ici. Un appelant qui construit ce
   *  filtre depuis un `<select>` (chaînes `"true"`/`"false"`/`""`) doit donc
   *  convertir explicitement en booléen (ou `undefined`) à la frontière,
   *  jamais transmettre la chaîne brute. */
  consentement?: boolean;
  /** Même remarque qu'au-dessus : booléen côté API, conversion à la
   *  frontière requise pour tout appelant piloté par un `<select>`. */
  a_un_compte?: boolean;
}

export interface RegistrationFilters {
  search?: string;
  statut?: string;
  promotion?: string;
  page?: number;
  page_size?: number;
  ordering?: string;
}
