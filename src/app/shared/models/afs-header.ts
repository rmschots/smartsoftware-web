import { AfsSection } from './afs-section';

export interface AfsHeader extends AfsSection {
  jobs: string;
  services: string;
  tellUs: string;
}
