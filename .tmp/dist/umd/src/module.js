(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@angular/core", "ionic-angular", "./image-viewer.directive", "./image-viewer.component", "./image-viewer.controller", "@angular/common/http", "@ngx-translate/core", "@ngx-translate/http-loader"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var core_1 = require("@angular/core");
    var ionic_angular_1 = require("ionic-angular");
    var image_viewer_directive_1 = require("./image-viewer.directive");
    var image_viewer_component_1 = require("./image-viewer.component");
    var image_viewer_controller_1 = require("./image-viewer.controller");
    var http_1 = require("@angular/common/http");
    var core_2 = require("@ngx-translate/core");
    var http_loader_1 = require("@ngx-translate/http-loader");
    function createTranslateLoader(http) {
        return new http_loader_1.TranslateHttpLoader(http, './assets/i18n/', '.json');
    }
    exports.createTranslateLoader = createTranslateLoader;
    var ɵ0 = (createTranslateLoader);
    exports.ɵ0 = ɵ0;
    var IonicImageViewerModule = (function () {
        function IonicImageViewerModule() {
        }
        IonicImageViewerModule.decorators = [
            { type: core_1.NgModule, args: [{
                        imports: [ionic_angular_1.IonicModule,
                            core_2.TranslateModule.forRoot({
                                loader: {
                                    provide: core_2.TranslateLoader,
                                    useFactory: ɵ0,
                                    deps: [http_1.HttpClient]
                                }
                            })],
                        declarations: [
                            image_viewer_component_1.ImageViewerComponent,
                            image_viewer_directive_1.ImageViewerDirective
                        ],
                        providers: [image_viewer_controller_1.ImageViewerController],
                        exports: [image_viewer_directive_1.ImageViewerDirective],
                        entryComponents: [image_viewer_component_1.ImageViewerComponent]
                    },] },
        ];
        /** @nocollapse */
        IonicImageViewerModule.ctorParameters = function () { return []; };
        return IonicImageViewerModule;
    }());
    exports.IonicImageViewerModule = IonicImageViewerModule;
});
//# sourceMappingURL=module.js.map