import {
	DomController,
	NavController,
	NavParams,
	Transition,
	Ion,
	PanGesture,
	Gesture,
	GestureController,
	Config,
	Platform,
    Animation
} from 'ionic-angular';
import { DIRECTION_HORIZONTAL, DIRECTION_VERTICAL } from 'ionic-angular/gestures/hammer';
import {
    AfterViewInit,
    Component,
    ElementRef,
    NgZone,
    OnDestroy,
    OnInit,
    Renderer,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { ImageViewerSrcAnimation } from './image-viewer-src-animation';
import { ImageViewerTransitionGesture } from './image-viewer-transition-gesture';
import { ImageViewerZoomGesture } from './image-viewer-zoom-gesture';
import { ImageViewerEnter, ImageViewerLeave } from './image-viewer-transitions';
import * as moment from 'moment';

@Component({
	selector: 'image-viewer',
	template: `
	<style>
		.hideDetails {
			bottom: -90px !important;
			transition: 0.5s ease;
		}
	</style>
		<ion-header no-border>
			<ion-navbar>
				<div *ngIf="gamepicturerelation">
					<ion-title *ngIf="gamepicturerelation.fk_gameid">{{gamepicturerelation.fk_gameid.gamename}}</ion-title>
					<p style="color: white; padding-left: 14px; margin-top: unset; margin-bottom: unset;" *ngIf="gamepicturerelation.fk_pictureid">{{gamepicturerelation.fk_pictureid.picturetitle}}</p>					
				</div>
				<div *ngIf="picture && !gamepicturerelation">
					<ion-title>{{picture.picturetitle}}</ion-title>					
				</div>
			</ion-navbar>
		</ion-header>

		<ion-backdrop (click)="bdClick()"></ion-backdrop>

		<div class="image-wrapper" (click)="toggleDetails()">
			<div class="image" #imageContainer>
				<img [src]="imageUrl" tappable #image />
			</div>
		</div>
		<div *ngIf="gamepicturerelation" [ngClass]="{'hideDetails': !showDetails}" style="z-index: 10; position: absolute; bottom: 0; width: 100%">
			<ion-item style="z-index: 10; position: absolute; bottom: 0;" >
				<ng-container *ngIf="gamepicturerelation.fk_pictureid">{{gamepicturerelation.fk_pictureid.picturedescription}}</ng-container>
				<p>
					<ion-grid>
						<ion-row>
							<ion-col *ngIf="gamepicturerelation.fk_pictureid && gamepicturerelation.fk_picturetypeid">
								{{'PICTURETYPE_CONSTANTS.' + gamepicturerelation.fk_picturetypeid.constantvalue | translate}}
							</ion-col>
							<ion-col *ngIf="gamepicturerelation.fk_pictureid">
								{{getCreatedFormatted(gamepicturerelation.fk_pictureid.created)}}
							</ion-col>						
						</ion-row>
					</ion-grid>
				</p>
			</ion-item>				
		</div>
		<div *ngIf="picture && !gamepicturerelation" [ngClass]="{'hideDetails': !showDetails}" style="z-index: 10; position: absolute; bottom: 0; width: 100%">
			<ion-item *ngIf="picture">
				{{picture.picturedescription}}
				<p>{{getCreatedFormatted(picture.created)}}</p>
			</ion-item>				
		</div>		
	`,
	styles: [],
	encapsulation: ViewEncapsulation.None
})
export class ImageViewerComponent extends Ion implements OnInit, OnDestroy, AfterViewInit {
	public imageUrl: SafeUrl;
	
	public picture;
	public gamepicturerelation;
	
	private showDetails: boolean = true;

	public dragGesture: ImageViewerTransitionGesture;

	@ViewChild('imageContainer') imageContainer;
	@ViewChild('image') image;

	private pinchGesture: ImageViewerZoomGesture;

	public isZoomed: boolean;

	private unregisterBackButton: Function;

	constructor(
		public _gestureCtrl: GestureController,
		public elementRef: ElementRef,
		private _nav: NavController,
		private _zone: NgZone,
		private renderer: Renderer,
		private domCtrl: DomController,
		private platform: Platform,
		private _navParams: NavParams,
		_config: Config,
		private _sanitizer: DomSanitizer
	) {
		super(_config, elementRef, renderer);

		const url = _navParams.get('image');
		this.updateImageSrc(url);
	}

	updateImageSrc(src) {
		this.imageUrl = this._sanitizer.bypassSecurityTrustUrl(src);
	}

	updateImageSrcWithTransition(src) {
		const imageElement = this.image.nativeElement;
		const lowResImgWidth = imageElement.clientWidth;

		this.updateImageSrc(src);

		const animation = new ImageViewerSrcAnimation(this.platform, this.image);
		imageElement.onload = () => animation.scaleFrom(lowResImgWidth);
	}

	ngOnInit() {
		const navPop = () => this._nav.pop();

		this.unregisterBackButton = this.platform.registerBackButtonAction(navPop);
		this._zone.runOutsideAngular(() => this.dragGesture = new ImageViewerTransitionGesture(this.platform, this, this.domCtrl, this.renderer, navPop));
	}

	ngAfterViewInit() {
		// imageContainer is set after the view has been initialized
		this._zone.runOutsideAngular(() => this.pinchGesture = new ImageViewerZoomGesture(this, this.imageContainer, this.platform, this.renderer));
	}

	ngOnDestroy() {
		this.dragGesture && this.dragGesture.destroy();
		this.pinchGesture && this.pinchGesture.destroy();

		this.unregisterBackButton();
	}
	
	getCreatedFormatted(created) {
		return moment(created).format("DD. MMMM YYYY, HH:mm");
	}

	bdClick() {
		if (this._navParams.get('enableBackdropDismiss')) {
			this._nav.pop();
		}
	}
	
	toggleDetails() {
	console.log("gamepicturerelation", this.gamepicturerelation)
		this.showDetails = !this.showDetails;
	}
}
