import { NgModule, APP_INITIALIZER } from '@angular/core';
import { IonicModule, Config } from 'ionic-angular';

import { ImageViewerDirective } from './image-viewer.directive';
import { ImageViewerComponent } from './image-viewer.component';
import { ImageViewerController } from './image-viewer.controller';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
	imports: [IonicModule,
	TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })],
	declarations: [
		ImageViewerComponent,
		ImageViewerDirective
	],
	providers: [ ImageViewerController ],
	exports: [ ImageViewerDirective ],
	entryComponents: [ ImageViewerComponent ]
})
export class IonicImageViewerModule {}
