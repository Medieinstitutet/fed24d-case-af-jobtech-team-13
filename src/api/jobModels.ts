export interface JobListItem {
  id: string;
  title: string;
  employer: string;
  city: string;
  region?: string;
  publicationDate: Date;
  logoUrl?: string;
  deadline?: Date;
}

export interface JobDetail extends JobListItem {
  description: string;
  descriptionFormatted: string;
  employmentType?: string;
  salary?: string;
  duration?: string;
  workingHours?: string;
  occupation?: string;
  country?: string;
  applicationUrl?: string;
}