import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterPersonasComponent } from './chapter-personas.component';

describe('ChapterPersonasComponent', () => {
  let component: ChapterPersonasComponent;
  let fixture: ComponentFixture<ChapterPersonasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChapterPersonasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterPersonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
