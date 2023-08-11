import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GameComponent} from './game.component';
import {FormsModule} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {of} from "rxjs";

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameComponent],
      imports: [FormsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({get: (param: string) => 'mocked-value'}),
          },
        },
      ],
    });
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it("corrext index", () => {
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        for (let k = 0; k < 3; k++)
          expect(component.getFeldIndex([i, j, k], [3, 3, 3])).toBe(i + (3 * j) + (9 * k))
  })

  it("correct bounds", () => {
    expect(component.isOrtInField([-1, 0, 0], [3, 3, 3])).toBe(false)
    expect(component.isOrtInField([0, 0, 0], [3, 3, 3])).toBe(true)
    expect(component.isOrtInField([1, 0, 0], [3, 3, 3])).toBe(true)
    expect(component.isOrtInField([2, 2, 2], [3, 3, 3])).toBe(true)
    expect(component.isOrtInField([0, 3, 0], [3, 3, 3])).toBe(false)
    expect(component.isOrtInField([4, 4, 4], [3, 3, 3])).toBe(false)
  })
  it("correct neighbours", () => {

    expect(new Set(component.neighbours([0, 0, 0], [3, 3, 3]))).toEqual(new Set([[1, 0, 0], [0, 0, 1], [0, 1, 0]]))
  })


  it("minecount", () => {
    let feld: boolean[] = [
      true, true, false,
      false, false, true,
      false, true, false
    ]
    expect(component.minesCount([1, 1], [3, 3], feld)).toBe(3)
    expect(component.minesCount([0, 2], [3, 3], feld)).toBe(1)
    expect(component.minesCount([2, 0], [3, 3], feld)).toBe(2)
    expect(component.minesCount([2,2], [3, 3], feld)).toBe(2)
    expect(component.minesCount([0, 1], [3, 3], feld)).toBe(1)
    expect(component.minesCount([1, 0], [3, 3], feld)).toBe(1)


  })

});
