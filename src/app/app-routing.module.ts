import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from "./presentation/page/list/list.component";
import {DetailOutletComponent} from "./presentation/page/detail/detail-outlet/detail-outlet.component";
import {UploadOutletComponent} from "./presentation/page/upload/upload-outlet/upload-outlet.component";

const routes: Routes = [
    {
        title: 'Image',
        path: 'details/:id',
        component: DetailOutletComponent,
        outlet: 'overlay'
    },
    {
        title: 'Upload',
        path: 'upload',
        component: UploadOutletComponent,
        outlet: 'overlay'
    },
    {
        title: 'Galerie',
        path: 'list',
        component: ListComponent
    },
    {
        path: '',
        redirectTo: '/list',
        pathMatch: 'full'
    },
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
