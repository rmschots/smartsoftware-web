import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AfsServicesSection } from '../../../shared/models/afs-services-section';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicesComponent {
  @Input() servicesData: AfsServicesSection;
}
