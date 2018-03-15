import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-call-to-action',
  templateUrl: './call-to-action.component.html',
  styleUrls: ['./call-to-action.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CallToActionComponent {
  @Output() tellUsClick: EventEmitter<boolean> = new EventEmitter<boolean>();

  clickTellUs() {
    this.tellUsClick.next(true);
  }
}
