import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultdashboardComponent } from './resultdashboard.component';

describe('ResultdashboardComponent', () => {
  let component: ResultdashboardComponent;
  let fixture: ComponentFixture<ResultdashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultdashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
