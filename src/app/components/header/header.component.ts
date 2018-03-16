import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AfsSection } from '../../shared/models/afs-section';
import { SectionService } from '../../shared/services/section.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {
  @Output() tellUsClick: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('canvasContainer') elementRef: ElementRef;

  headerData$: Observable<AfsSection>;

  private pauseRendering = false;

  private container: HTMLElement;
  private scene;
  private camera;
  private renderer;
  private winHalfX;
  private winHalfY;
  private height;
  private width;
  private fieldOfView;
  private aspectRatio;
  private nearPlane;
  private farPlane;
  private cameraZ;
  private i = 0;
  private count = 0;
  private mouseX = 0;
  private mouseY = 0;
  private amtX = 50;
  private amtY = 50;
  private sep = 100;

  private particles = [];

  constructor(private _afs: AngularFirestore, private _sectionService: SectionService) {
    this.headerData$ = _afs.doc<AfsSection>('sections/header').valueChanges();
  }

  ngAfterViewInit(): void {
    this.container = this.elementRef.nativeElement;

    this.height = window.innerHeight;
    this.winHalfY = this.height / 2;
    this.width = window.innerWidth;
    this.winHalfX = this.width / 2;
    this.fieldOfView = 75;
    this.aspectRatio = this.width / this.height;
    this.nearPlane = 1;
    this.farPlane = 10000;
    this.cameraZ = 750;

    this.rendererer();
    this.animate();
    this._sectionService.isSticky$.subscribe(isSticky => {
      this.pauseRendering = isSticky;
      if (!isSticky) {
        this.animate();
      }
    });
  }

  clickTellUs() {
    this.tellUsClick.next(true);
  }

  rendererer() {
    this.camera = new THREE.PerspectiveCamera(this.fieldOfView, this.aspectRatio, this.nearPlane, this.farPlane);
    this.camera.position.z = this.cameraZ;
    this.scene = new THREE.Scene();

    const texture = new THREE.ImageUtils.loadTexture('/assets/img/logo-sprite.png');
    const spriteMaterial = new THREE.SpriteMaterial({
        opacity: 0.3,
        map: texture
      }
    );
    for (let ix = 0, lx = this.amtX; ix < lx; ix++) {

      for (let iy = 0, ly = this.amtY; iy < ly; iy++) {
        const ptc = this.particles[this.i++] = new THREE.Sprite(spriteMaterial);
        ptc.position.x = ix * this.sep - ((this.amtX * this.sep) / 2);
        ptc.position.z = iy * this.sep - ((this.amtY * this.sep) / 2);
        this.scene.add(ptc);
      }
    }

    this.renderer = new THREE.CanvasRenderer({alpha: true});
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);

    this.container.appendChild(this.renderer.domElement);
  }

  animate() {
    const self: HeaderComponent = this;
    (function render() {
      if (self.pauseRendering) {
        return;
      }
      requestAnimationFrame(render);
      self.update();
    }());
  }

  update() {
    this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.05;
    this.camera.position.y += (this.mouseY - this.camera.position.y) * 0.05;
    this.camera.lookAt(this.scene.position);

    let i = 0;
    for (let ix = 0, lx = this.amtX; ix < lx; ix++) {

      for (let iy = 0, ly = this.amtY; iy < ly; iy++) {
        const ptc = this.particles[i++];
        ptc.position.y = (Math.sin((ix + this.count) * 0.3) * 50) + (Math.sin((iy + this.count) * 0.5) * 50);
        ptc.scale.x
          = ptc.scale.y
          = (Math.sin((ix + this.count) * 0.3) + 1) * 4 + (Math.sin((iy + this.count) * 0.5) + 1) * 8;
        this.scene.add(ptc);
      }
    }

    this.renderer.render(this.scene, this.camera);
    this.count += 0.1;
  }

  @HostListener('document:mousemove', ['$event'])
  onDocumentMouseMove(e) {
    this.mouseX = e.clientX - this.winHalfX;
    this.mouseY = e.clientY - this.winHalfY;
  }

  @HostListener('document:touchstart', ['$event'])
  onDocumentTouchStart(e) {
    if (e.touches.length === 1) {
      e.preventDefault();
      this.mouseX = e.touches[0].pageX - this.winHalfX;
      this.mouseY = e.touches[0].pageY - this.winHalfY;
    }
  }

  @HostListener('document:touchmove', ['$event'])
  onDocumentTouchMove(e) {
    if (e.touches.length === 1) {
      e.preventDefault();
      this.mouseX = e.touches[0].pageX - this.winHalfX;
      this.mouseY = e.touches[0].pageY - this.winHalfY;
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.height = window.innerHeight;
    this.winHalfY = this.height / 2;
    this.width = window.innerWidth;
    this.winHalfX = this.width / 2;

    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.width, this.height);
  }
}
