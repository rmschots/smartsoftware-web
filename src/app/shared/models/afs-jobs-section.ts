import { AfsSection } from './afs-section';

export interface AfsJobsSection extends AfsSection {
  jobs: {
    date: Date;
    location: string;
    title: string;
  }[];
  jobsTitle: string;
}
