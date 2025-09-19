import type { ApiJobHit } from './types';
import type { JobListItem, JobDetail } from './jobModels';

export function transformApiJobToListItem(apiJob: ApiJobHit): JobListItem {
  return {
    id: apiJob.id,
    title: apiJob.headline,
    employer: apiJob.employer.name,
    city: apiJob.workplace_address?.municipality || 'Unknown',
    region: apiJob.workplace_address?.region,
    publicationDate: new Date(apiJob.publication_date),
    logoUrl: apiJob.logo_url,
    deadline: apiJob.application_deadline ? new Date(apiJob.application_deadline) : undefined,
    occupation: apiJob.occupation?.label,
  };
}

export function transformApiJobToDetail(apiJob: ApiJobHit): JobDetail {
  return {
    ...transformApiJobToListItem(apiJob),
    description: apiJob.description.text,
    descriptionFormatted: apiJob.description.text_formatted,
    employmentType: apiJob.employment_type?.label,
    salary: apiJob.salary_description,
    duration: apiJob.duration?.label,
    workingHours: apiJob.working_hours_type?.label,
    country: apiJob.workplace_address?.country,
    applicationUrl: apiJob.application_details.url,
  };
}

