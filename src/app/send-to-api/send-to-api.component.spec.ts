/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SendToApiComponent } from './send-to-api.component';

describe('SendToApiComponent', () => {
  let component: SendToApiComponent;
  let fixture: ComponentFixture<SendToApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendToApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendToApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
