import type { LoaderFunctionArgs } from "react-router";
import { jobService } from "../api/jobService";

export const jobDetailsLoader = async ({ params }: LoaderFunctionArgs) => {
  const { id } = params;

  if (!id) {
    throw new Response('Job ID is required', {status: 400});
  }

  const job = await jobService.getJobById(id);

  if (!job) {
    throw new Response('Job not found', {status: 400});
  }

  return job;
}