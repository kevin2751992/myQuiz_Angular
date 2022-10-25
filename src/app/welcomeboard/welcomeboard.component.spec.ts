import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeboardComponent } from './welcomeboard.component';

describe('WelcomeboardComponent', () => {
  let component: WelcomeboardComponent;
  let fixture: ComponentFixture<WelcomeboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WelcomeboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
