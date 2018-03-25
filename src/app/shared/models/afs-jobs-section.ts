import { AfsSection } from './afs-section';

export interface Job {
  date: Date;
  location: string;
  title: string;
  description: string;
}

export interface AfsJobsSection extends AfsSection {
  jobs: Job[];
  jobsTitle: string;
  jobDetails: string;
  reason: string;
  reasons: {
    title: string;
    description: string;
  }[];
  allJobs: string;
}
