import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from "./presentation/page/list/list.component";

const routes: Routes = [
    {
        title: 'Galerie',
        path: '**',
        component: ListComponent
    },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
