import { AfsSection } from './afs-section';

export interface AfsJob {
  id: string;
  date: Date;
  location: string;
  title: string;
  description: string;
}

export interface AfsJobsSection extends AfsSection {
  jobs: AfsJob[];
  jobsTitle: string;
  jobDetails: string;
  reason: string;
  reasons: {
    title: string;
    description: string;
  }[];
  allJobs: string;
}
