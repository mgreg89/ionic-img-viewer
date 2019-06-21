var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "ionic-angular", "@angular/core", "@angular/platform-browser", "./image-viewer-src-animation", "./image-viewer-transition-gesture", "./image-viewer-zoom-gesture", "moment"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ionic_angular_1 = require("ionic-angular");
    var core_1 = require("@angular/core");
    var platform_browser_1 = require("@angular/platform-browser");
    var image_viewer_src_animation_1 = require("./image-viewer-src-animation");
    var image_viewer_transition_gesture_1 = require("./image-viewer-transition-gesture");
    var image_viewer_zoom_gesture_1 = require("./image-viewer-zoom-gesture");
    var moment = require("moment");
    var ImageViewerComponent = (function (_super) {
        __extends(ImageViewerComponent, _super);
        function ImageViewerComponent(_gestureCtrl, elementRef, _nav, _zone, renderer, domCtrl, platform, _navParams, _config, _sanitizer) {
            var _this = _super.call(this, _config, elementRef, renderer) || this;
            _this._gestureCtrl = _gestureCtrl;
            _this.elementRef = elementRef;
            _this._nav = _nav;
            _this._zone = _zone;
            _this.renderer = renderer;
            _this.domCtrl = domCtrl;
            _this.platform = platform;
            _this._navParams = _navParams;
            _this._sanitizer = _sanitizer;
            _this.showDetails = true;
            var url = _navParams.get('image');
            _this.updateImageSrc(url);
            return _this;
        }
        ImageViewerComponent.prototype.updateImageSrc = function (src) {
            this.imageUrl = this._sanitizer.bypassSecurityTrustUrl(src);
        };
        ImageViewerComponent.prototype.updateImageSrcWithTransition = function (src) {
            var imageElement = this.image.nativeElement;
            var lowResImgWidth = imageElement.clientWidth;
            this.updateImageSrc(src);
            var animation = new image_viewer_src_animation_1.ImageViewerSrcAnimation(this.platform, this.image);
            imageElement.onload = function () { return animation.scaleFrom(lowResImgWidth); };
        };
        ImageViewerComponent.prototype.ngOnInit = function () {
            var _this = this;
            var navPop = function () { return _this._nav.pop(); };
            this.unregisterBackButton = this.platform.registerBackButtonAction(navPop);
            this._zone.runOutsideAngular(function () { return _this.dragGesture = new image_viewer_transition_gesture_1.ImageViewerTransitionGesture(_this.platform, _this, _this.domCtrl, _this.renderer, navPop); });
        };
        ImageViewerComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            // imageContainer is set after the view has been initialized
            this._zone.runOutsideAngular(function () { return _this.pinchGesture = new image_viewer_zoom_gesture_1.ImageViewerZoomGesture(_this, _this.imageContainer, _this.platform, _this.renderer); });
        };
        ImageViewerComponent.prototype.ngOnDestroy = function () {
            this.dragGesture && this.dragGesture.destroy();
            this.pinchGesture && this.pinchGesture.destroy();
            this.unregisterBackButton();
        };
        ImageViewerComponent.prototype.getCreatedFormatted = function (created) {
            return moment(created).format("DD. MMMM YYYY, HH:mm");
        };
        ImageViewerComponent.prototype.bdClick = function () {
            if (this._navParams.get('enableBackdropDismiss')) {
                this._nav.pop();
            }
        };
        ImageViewerComponent.prototype.toggleDetails = function () {
            console.log("gamepicturerelation", this.gamepicturerelation);
            this.showDetails = !this.showDetails;
        };
        ImageViewerComponent.decorators = [
            { type: core_1.Component, args: [{
                        selector: 'image-viewer',
                        template: "\n\t<style>\n\t\t.hideDetails {\n\t\t\tbottom: -90px !important;\n\t\t\ttransition: 0.5s ease;\n\t\t}\n\t</style>\n\t\t<ion-header no-border>\n\t\t\t<ion-navbar>\n\t\t\t\t<div *ngIf=\"gamepicturerelation\">\n\t\t\t\t\t<ion-title *ngIf=\"gamepicturerelation.fk_gameid\">{{gamepicturerelation.fk_gameid.gamename}}</ion-title>\n\t\t\t\t\t<p style=\"color: white; padding-left: 14px; margin-top: unset; margin-bottom: unset;\" *ngIf=\"gamepicturerelation.fk_pictureid\">{{gamepicturerelation.fk_pictureid.picturetitle}}</p>\t\t\t\t\t\n\t\t\t\t</div>\n\t\t\t\t<div *ngIf=\"picture && !gamepicturerelation\">\n\t\t\t\t\t<ion-title>{{picture.picturetitle}}</ion-title>\t\t\t\t\t\n\t\t\t\t</div>\n\t\t\t</ion-navbar>\n\t\t</ion-header>\n\n\t\t<ion-backdrop (click)=\"bdClick()\"></ion-backdrop>\n\n\t\t<div class=\"image-wrapper\" (click)=\"toggleDetails()\">\n\t\t\t<div class=\"image\" #imageContainer>\n\t\t\t\t<img [src]=\"imageUrl\" tappable #image />\n\t\t\t</div>\n\t\t</div>\n\t\t<div *ngIf=\"gamepicturerelation\" [ngClass]=\"{'hideDetails': !showDetails}\" style=\"z-index: 10; position: absolute; bottom: 0; width: 100%\">\n\t\t\t<ion-item style=\"z-index: 10; position: absolute; bottom: 0;\" >\n\t\t\t\t<ng-container *ngIf=\"gamepicturerelation.fk_pictureid\">{{gamepicturerelation.fk_pictureid.picturedescription}}</ng-container>\n\t\t\t\t<p>\n\t\t\t\t\t<ion-grid>\n\t\t\t\t\t\t<ion-row>\n\t\t\t\t\t\t\t<ion-col *ngIf=\"gamepicturerelation.fk_pictureid && gamepicturerelation.fk_picturetypeid\">\n\t\t\t\t\t\t\t\t{{'PICTURETYPE_CONSTANTS.' + gamepicturerelation.fk_picturetypeid.constantvalue | translate}}\n\t\t\t\t\t\t\t</ion-col>\n\t\t\t\t\t\t\t<ion-col *ngIf=\"gamepicturerelation.fk_pictureid\">\n\t\t\t\t\t\t\t\t{{getCreatedFormatted(gamepicturerelation.fk_pictureid.created)}}\n\t\t\t\t\t\t\t</ion-col>\t\t\t\t\t\t\n\t\t\t\t\t\t</ion-row>\n\t\t\t\t\t</ion-grid>\n\t\t\t\t</p>\n\t\t\t</ion-item>\t\t\t\t\n\t\t</div>\n\t\t<div *ngIf=\"picture && !gamepicturerelation\" [ngClass]=\"{'hideDetails': !showDetails}\" style=\"z-index: 10; position: absolute; bottom: 0; width: 100%\">\n\t\t\t<ion-item *ngIf=\"picture\">\n\t\t\t\t{{picture.picturedescription}}\n\t\t\t\t<p>{{getCreatedFormatted(picture.created)}}</p>\n\t\t\t</ion-item>\t\t\t\t\n\t\t</div>\t\t\n\t",
                        styles: ['image-viewer.ion-page { position: absolute; top: 0; right: 0; bottom: 0; left: 0; display: flex; flex-direction: column; height: 100%; opacity: 1; } image-viewer.ion-page ion-navbar.toolbar .toolbar-background { background-color: transparent; } image-viewer.ion-page ion-navbar.toolbar.toolbar-ios { padding-top: calc(20px + 4px); } image-viewer.ion-page ion-navbar .bar-button-default { color: white; } image-viewer.ion-page .backdrop { will-change: opacity; } image-viewer.ion-page .image-wrapper { position: relative; z-index: 10; display: flex; overflow: hidden; flex-direction: column; pointer-events: none; margin-top: 56px; flex-grow: 1; justify-content: center; } image-viewer.ion-page .image { will-change: transform; } image-viewer.ion-page img { display: block; pointer-events: auto; max-width: 100%; max-height: 100vh; margin: 0 auto; } '],
                        encapsulation: core_1.ViewEncapsulation.None
                    },] },
        ];
        /** @nocollapse */
        ImageViewerComponent.ctorParameters = function () { return [
            { type: ionic_angular_1.GestureController, },
            { type: core_1.ElementRef, },
            { type: ionic_angular_1.NavController, },
            { type: core_1.NgZone, },
            { type: core_1.Renderer, },
            { type: ionic_angular_1.DomController, },
            { type: ionic_angular_1.Platform, },
            { type: ionic_angular_1.NavParams, },
            { type: ionic_angular_1.Config, },
            { type: platform_browser_1.DomSanitizer, },
        ]; };
        ImageViewerComponent.propDecorators = {
            "imageContainer": [{ type: core_1.ViewChild, args: ['imageContainer',] },],
            "image": [{ type: core_1.ViewChild, args: ['image',] },],
        };
        return ImageViewerComponent;
    }(ionic_angular_1.Ion));
    exports.ImageViewerComponent = ImageViewerComponent;
});
//# sourceMappingURL=image-viewer.component.js.map