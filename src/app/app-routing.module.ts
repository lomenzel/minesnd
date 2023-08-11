import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StartComponent} from "./start/start.component";
import {GameComponent} from "./game/game.component";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";

const routes: Routes = [
  {path: "", component: StartComponent},
  {path: "game/:dimension/:fill", component: GameComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ]
})
export class AppRoutingModule {
}
