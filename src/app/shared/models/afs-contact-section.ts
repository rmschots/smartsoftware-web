import { AfsSection } from './afs-section';

export interface AfsContactSection extends AfsSection {
  address: {
    title: string;
    street: string;
    place: string;
  };
  reason: string;
  reasons:{
    title: string;
    descrption
  }[];
  phone: string;
  email: string;
  vat: string;
}
