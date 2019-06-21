import { ElementRef, EventEmitter } from '@angular/core';
import { PictureOptions } from './image-viewer';
import { ImageViewerController } from './image-viewer.controller';
export declare class ImageViewerDirective {
    private _el;
    private imageViewerCtrl;
    src: string;
    picture: PictureOptions;
    gamepicturerelation: {};
    close: EventEmitter<{}>;
    constructor(_el: ElementRef, imageViewerCtrl: ImageViewerController);
    onClick(event: Event): void;
}
