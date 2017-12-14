import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustAdminComponent } from './trust-admin.component';

describe('TrustAdminComponent', () => {
  let component: TrustAdminComponent;
  let fixture: ComponentFixture<TrustAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrustAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrustAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
