import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AfsSection } from '../../../shared/models/afs-section';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicesComponent {
  @Input() servicesData: AfsSection;
}
