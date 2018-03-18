import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AfsSection } from '../../../shared/models/afs-section';

@Component({
  selector: 'app-call-to-action',
  templateUrl: './call-to-action.component.html',
  styleUrls: ['./call-to-action.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CallToActionComponent {
  @Output() tellUsClick: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() callToActionData: AfsSection;

  clickTellUs() {
    this.tellUsClick.next(true);
  }
}
