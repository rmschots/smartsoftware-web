import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AfsSection } from '../../../shared/models/afs-section';

@Component({
  selector: 'app-slogan',
  templateUrl: './slogan.component.html',
  styleUrls: ['./slogan.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SloganComponent {
  @Input() sloganData: AfsSection;
}
