import { AfsSection } from './afs-section';
export interface AfsServicesSection extends AfsSection {
  services:{
    service: string;
    description: string;
  }[];
}
