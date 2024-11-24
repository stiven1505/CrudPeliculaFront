import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaPublicaComponent } from './area-publica.component';

describe('AreaPublicaComponent', () => {
  let component: AreaPublicaComponent;
  let fixture: ComponentFixture<AreaPublicaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AreaPublicaComponent]
    });
    fixture = TestBed.createComponent(AreaPublicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
