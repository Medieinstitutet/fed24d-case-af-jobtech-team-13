import axios from 'axios';
import type { ApiJobHit, ApiJobResponse } from './types';
import type { JobListItem, JobDetail } from './jobModels';
import { transformApiJobToListItem, transformApiJobToDetail } from './transformers';

export interface JobSearchParams {
  q?: string; // search query
  offset?: number; // for pagination, defaults to 0
  limit?: number; // for pagination, defaults to 10
  municipalities?: string[]; // municipality concept_ids for filtering by cities
  occupationGroups?: string[]; // occupation group IDs for filtering by job categories
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
      // Build request params
      const requestParams = new URLSearchParams();
      requestParams.append('q', params.q || '');
      requestParams.append('offset', (params.offset || 0).toString());
      requestParams.append('limit', (params.limit || 10).toString());

      // Add municipality filters if provided
      if (params.municipalities && params.municipalities.length > 0) {
        params.municipalities.forEach(municipality => {
          requestParams.append('municipality', municipality);
        });
      }

      // Add multiple occupation-group filters if provided
      if (params.occupationGroups && params.occupationGroups.length > 0) {
        params.occupationGroups.forEach(group => {
          requestParams.append('occupation-group', group);
        });
      }

      const response = await axios.get<ApiJobResponse>(this.baseUrl, {
        params: requestParams,
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