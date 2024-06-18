import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyisComponent } from './analyis.component';

describe('AnalyisComponent', () => {
  let component: AnalyisComponent;
  let fixture: ComponentFixture<AnalyisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalyisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnalyisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
