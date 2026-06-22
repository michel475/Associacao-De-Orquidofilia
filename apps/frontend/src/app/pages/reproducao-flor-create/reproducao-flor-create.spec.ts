import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReproducaoFlorCreate } from './reproducao-flor-create';

describe('ReproducaoFlorCreate', () => {
  let component: ReproducaoFlorCreate;
  let fixture: ComponentFixture<ReproducaoFlorCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReproducaoFlorCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(ReproducaoFlorCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
