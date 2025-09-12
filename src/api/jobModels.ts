export interface JobListItem {
  id: string;
  title: string;
  employer: string;
  city: string;
  region?: string;
  publicationDate: Date;
  logoUrl?: string;
  deadline?: Date;
  employmentType?: string;
  workingHours?: string;
  occupation?: string;
}

export interface JobDetail extends JobListItem {
  description: string;
  descriptionFormatted: string;
  salary?: string;
  duration?: string;
  country?: string;
  applicationUrl?: string;
}