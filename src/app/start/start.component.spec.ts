import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StartComponent} from './start.component';
import {FormsModule} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {of} from "rxjs";

describe('StartComponent', () => {
  let component: StartComponent;
  let fixture: ComponentFixture<StartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StartComponent],
      imports: [FormsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({get: (param: string) => 'mocked-value'})
          }
        }
      ]
    });
    fixture = TestBed.createComponent(StartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
