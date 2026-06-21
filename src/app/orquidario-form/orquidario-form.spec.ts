import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrquidarioForm } from './orquidario-form';

describe('OrquidarioForm', () => {
  let component: OrquidarioForm;
  let fixture: ComponentFixture<OrquidarioForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrquidarioForm],
    }).compileComponents();

    fixture = TestBed.createComponent(OrquidarioForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
