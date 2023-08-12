import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent {

  progress: { flaged: number, alle: number } = {flaged: 0, alle: 0};
  todo = 0;

  start = Date.now()
  fill: number = 0
  dimensionCount: number = 0
  original: boolean[] = []
  dim: number[][] = [[1], [1]]
  current: (number | "flagge" | "verdeckt" | "miene")[] = []
  dimCount: number[] = []
  currentDisplay: number[] = []
  flagge = false;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.paramMap.subscribe(params => {
      this.generateFeld(JSON.parse(params.get("dimension") || "[]"), JSON.parse(params.get("fill") || "0"))
      this.progress = this.mineStat()
    })

  }

  generateFeld(dim: number[], fill: number): void {

    if (dim.length < 2) dim.push(1)
    if (dim.length < 2) dim.push(1)

    this.fill = fill
    let placesCount = dim.reduce((t, e) => t * e)
    let places: boolean[] = []
    console.log(placesCount)

    for (let i = 0; i < Math.ceil(placesCount * (fill / 100)); i++) {
      places.push(true)
    }
    for (let i = 0; i < Math.floor(placesCount - (placesCount * (fill / 100))); i++) {
      places.push(false)
    }
    this.original = places.sort((e, e2) => {
      return 0.5 - Math.random()
    })

    this.current = places.map(e => "verdeckt")
    this.dimCount = dim
    this.dim = dim.map(this.range)

    for (let i = 2; i < dim.length; i++) {
      this.currentDisplay.push(0)
    }

  }

  open(ort: number[], invert: boolean, e: Event) {
    e.preventDefault()
    if (invert) this.flagge = !this.flagge

    if (this.flagge) {
      this.setMine(ort)
      this.progress = this.mineStat()
      if (this.todo == 0) this.win()
      if (invert) this.flagge = !this.flagge
      return;
    }


    if (this.original[this.getFeldIndex(ort, this.dimCount)] && this.current[this.getFeldIndex(ort, this.dimCount)] == "verdeckt") {

      if (this.zuÖffnen() == this.original.length && this.zuÖffnen() > this.mineStat().alle) {
        this.generateFeld(this.dimCount, this.fill)
        this.open(ort, false, e)
      } else {
        alert("du hast verloren");
        location.reload()
      }
    } else if (this.current[this.getFeldIndex(ort, this.dimCount)] == "verdeckt") {
      this.current[this.getFeldIndex(ort, this.dimCount)] = this.minesCount(ort, this.dimCount, this.original)
    } else {
      console.error("huch")
      return
    }
    this.progress = this.mineStat()
    if (this.todo == 0) this.win()


    if (invert) this.flagge = !this.flagge
    if (this.minesCount(ort, this.dimCount, this.original) == 0) {
      for (let n of this.neighbours(ort, this.dimCount)) {
        if (this.current[this.getFeldIndex(n, this.dimCount)] == "verdeckt")
          this.open(n, invert, e)
      }
    }
  }

  win() {
    let current: number[] = JSON.parse(localStorage.getItem(JSON.stringify({
      dim: this.dimCount,
      mines: this.fill
    })) || "[]")
    current.push(Date.now() - this.start)
    localStorage.setItem(JSON.stringify({dim: this.dimCount, mines: this.fill}), JSON.stringify(current))
    alert("Du hast gewonnen")
  }

  setMine(ort: number[]) {
    if (this.current[this.getFeldIndex(ort, this.dimCount)] == "flagge")
      this.current[this.getFeldIndex(ort, this.dimCount)] = "verdeckt";
    else this.current[this.getFeldIndex(ort, this.dimCount)] = "flagge";

  }


  getFeldIndex(ort: number[], dims: number[]): number {
    let index = 0;
    for (let i = 0; i < ort.length; i++) {
      index += ort[i] * dims.slice(0, i).reduce((t, e) => e * t, 1)
    }
    return index
  }

  isOrtInField(ort: number[], dims: number[]): boolean {
    for (let i = 0; i < ort.length; i++) {
      if (ort[i] < 0) return false
      if (ort[i] >= dims[i]) return false
    }
    return true
  }

  neighbours(ort: number[], dims: number[]): Set<number[]> {
    let neighbours: Set<number[]> = new Set();
    for (let i = 0; i < ort.length; i++) {
      let left = [...ort]
      left[i]++
      let right = [...ort]
      right[i]--

      if (this.isOrtInField(left, dims)) neighbours.add(left)
      if (this.isOrtInField(right, dims)) neighbours.add(right)

    }
    return neighbours
  }

  minesCount(ort: number[], dims: number[], original: boolean[]): number {
    return [...this.neighbours(ort, dims)].map(e => {
      return original[this.getFeldIndex(e, dims)]
    }).reduce((t, e) => {
      if (e) return t + 1;
      else return t;
    }, 0)
  }

  range(n: number): number[] {
    let a: number[] = [];
    for (let i = 0; i < n; i++) {
      a.push(i)
    }
    return a;
  }

  // Beispiel-Code in der Komponente
  combineArrays(x: number, y: number): number[] {
    return [x, y, ...this.currentDisplay];
  }

  mineStat(): { flaged: number, alle: number } {
    this.todo = this.zuÖffnen()
    return {
      flaged: this.current.reduce((t: number, e) => e == "flagge" ? t + 1 : t, 0),
      alle: this.original.reduce((t: number, e: boolean) => e ? t + 1 : t, 0)
    }
  }

  zuÖffnen(): number {
    return this.current.reduce((t: number, e) => e == "verdeckt" ? t + 1 : t, 0)
  }

}
