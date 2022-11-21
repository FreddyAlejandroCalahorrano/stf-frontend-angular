import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillsPersonasComponent } from './skills-personas.component';

describe('SkillsPersonasComponent', () => {
  let component: SkillsPersonasComponent;
  let fixture: ComponentFixture<SkillsPersonasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillsPersonasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillsPersonasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
