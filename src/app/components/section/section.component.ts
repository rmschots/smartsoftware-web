import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { SectionService } from '../../shared/services/section.service';
import { interval } from 'rxjs/observable/interval';
import { Unsubscribable } from '../../shared/util/unsubscribable';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionComponent extends Unsubscribable implements AfterViewInit {

  @HostBinding('attr.id') @Input() sectionName: string;

  constructor(private element: ElementRef, private _sectionService: SectionService) {
    super();
  }

  ngAfterViewInit() {
    this.notifyChangePosition();
    interval(1000).takeUntil(this.ngUnsubscribe$)
      .subscribe(() => this.notifyChangePosition());
  }


  @HostListener('window:resize', ['$event'])
  onResize() {
    this.notifyChangePosition();
  }

  private notifyChangePosition() {
    this._sectionService.addSection({name: this.sectionName, position: this.element.nativeElement.offsetTop});
  }

}
