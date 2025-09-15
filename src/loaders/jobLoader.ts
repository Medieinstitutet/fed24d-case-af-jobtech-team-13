import { jobService } from "../api/jobService"

export const jobSearchLoader = async () => {
  try {
    const result = await jobService.searchJobs({ q: '' });
    return {
      jobs: result.hits,
      total: result.total
    }
  } catch (err: unknown) {
    console.error('Error loading jobs:', err);
    return {
      jobs: [],
      total: 0
    }
  }
}