import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from "./presentation/page/list/list.component";
import {DetailComponent} from "./presentation/page/detail/detail/detail.component";

const routes: Routes = [
    {
        title: 'Image',
        path: 'details/:id',
        component: DetailComponent,
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
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
