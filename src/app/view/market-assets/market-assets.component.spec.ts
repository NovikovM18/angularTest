import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketAssetsComponent } from './market-assets.component';

describe('MarketAssetsComponent', () => {
  let component: MarketAssetsComponent;
  let fixture: ComponentFixture<MarketAssetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketAssetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
