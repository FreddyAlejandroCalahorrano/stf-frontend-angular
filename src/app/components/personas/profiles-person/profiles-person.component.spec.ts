import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilesPersonComponent } from './profiles-person.component';

describe('ProfilesPersonComponent', () => {
  let component: ProfilesPersonComponent;
  let fixture: ComponentFixture<ProfilesPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilesPersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilesPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
