import { Component } from '@angular/core';
import { Router} from "@angular/router";

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent {
  constructor(private router:Router) {
    this.loadPreset()
  }

  dimensions :number[] = [5,5]
  fill: number = 25;

  addDimension(){
    this.dimensions.push(3)
  }
  trackByIndex(index: number, item: number) {
    return index;
  }
  startGame(config:{dim:number[],mines:number}){
    this.router.navigate(["game", JSON.stringify(config.dim), config.mines])
  }
  delete(index:number){
    this.dimensions.splice(index,1)
  }
  preSet:{dim:number[],mines:number}[] = []
  loadPreset(){
    this.preSet = JSON.parse( localStorage.getItem("pre")||"[]")
  }
  setPreset(){
    localStorage.setItem("pre",JSON.stringify(this.preSet))
  }

  addPreset(pre:{dim:number[],mines:number}){
    this.deletePreset(pre)
    this.preSet.push(JSON.parse(JSON.stringify(pre)))
    this.setPreset()

  }
  deletePreset(pre:{dim:number[], mines:number}){
    this.preSet = this.preSet.filter(e => JSON.stringify(pre) !== JSON.stringify(e))
    this.setPreset()
  }

  getHighscores(config:{dim:number[],mines:number}):number[]{
    return  JSON.parse(localStorage.getItem(JSON.stringify(config))||"[]").sort((a:number,b:number)=>a-b)

  }

}
