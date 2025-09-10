import axios from 'axios';
import type { ApiJobHit, ApiJobResponse } from './types';
import type { JobListItem, JobDetail } from './jobModels';
import { transformApiJobToListItem, transformApiJobToDetail } from './transformers';

export interface JobSearchParams {
  q?: string; // search query
  /**
  position?: number;
  limit?: number;  
  region?: string;
  municipality?: string;
  */
}

export class JobService {
  private readonly baseUrl: string = import.meta.env.VITE_API_BASE_URL;
  private readonly adUrl: string = import.meta.env.VITE_API_AD_URL

  async searchJobs(params: JobSearchParams = {}): Promise<{
    total: number;
    position: number;
    hits: JobListItem[];
  }> {
    try {
      const response = await axios.get<ApiJobResponse>(this.baseUrl, {
        params: {
          q: params.q || '',
        },
      });

      const hits = response.data.hits.map(transformApiJobToListItem);

      return {
        hits,
        total: response.data.total.value,
        position: response.data.position,
      };
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw new Error('Failed to fetch jobs');
    }
  }

  async getJobById(id: string): Promise<JobDetail | null> {
    try {
      const response = await axios.get<ApiJobHit>(`${this.adUrl}/${id}`);
      
      return transformApiJobToDetail(response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      console.error('Error fetching job details:', error);
      throw new Error('Failed to fetch job details');
    }
  }
}

export const jobService = new JobService();