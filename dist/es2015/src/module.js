import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ImageViewerDirective } from './image-viewer.directive';
import { ImageViewerComponent } from './image-viewer.component';
import { ImageViewerController } from './image-viewer.controller';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function createTranslateLoader(http) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
var ɵ0 = (createTranslateLoader);
var IonicImageViewerModule = (function () {
    function IonicImageViewerModule() {
    }
    IonicImageViewerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [IonicModule,
                        TranslateModule.forRoot({
                            loader: {
                                provide: TranslateLoader,
                                useFactory: ɵ0,
                                deps: [HttpClient]
                            }
                        })],
                    declarations: [
                        ImageViewerComponent,
                        ImageViewerDirective
                    ],
                    providers: [ImageViewerController],
                    exports: [ImageViewerDirective],
                    entryComponents: [ImageViewerComponent]
                },] },
    ];
    /** @nocollapse */
    IonicImageViewerModule.ctorParameters = function () { return []; };
    return IonicImageViewerModule;
}());
export { IonicImageViewerModule };
export { ɵ0 };
//# sourceMappingURL=module.js.map