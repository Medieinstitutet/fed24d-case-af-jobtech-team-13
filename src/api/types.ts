export interface ApiJobHit {
  id: string;
  headline: string;
  webpage_url: string;
  logo_url?: string;
  application_deadline?: string;
  nummber_of_vacancies?: number;
  description: {
    text: string;
    text_formatted: string;
    conditions?: string;
  };
  employer: {
    name: string;
    workplace?: string;
  };
  application_details: {
    url?: string;
  };
  employment_type?: {
    label: string;
  };
  salary_description?: string;
  duration?: {
    label: string;
  };

  working_hours_type?: {
    label: string;
  };

  occupation?: {
    label: string;
  };

  workplace_address?: {
    municipality?: string;
    region?: string;
    country?: string;
  };
  publication_date: string;
}

export interface ApiJobResponse {
  total: { value: number };
  position: number;
  hits: ApiJobHit[];
}