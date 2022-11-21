import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAsignacionesComponent } from './page-asignaciones.component';

describe('PageAsignacionesComponent', () => {
  let component: PageAsignacionesComponent;
  let fixture: ComponentFixture<PageAsignacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageAsignacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAsignacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
