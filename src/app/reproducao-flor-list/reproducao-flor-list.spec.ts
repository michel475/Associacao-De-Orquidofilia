import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReproducaoFlorList } from './reproducao-flor-list';

describe('ReproducaoFlorList', () => {
  let component: ReproducaoFlorList;
  let fixture: ComponentFixture<ReproducaoFlorList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReproducaoFlorList],
    }).compileComponents();

    fixture = TestBed.createComponent(ReproducaoFlorList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
