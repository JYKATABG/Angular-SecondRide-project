import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersCatalogComponent } from './offers-catalog.component';

describe('OffersCatalogComponent', () => {
  let component: OffersCatalogComponent;
  let fixture: ComponentFixture<OffersCatalogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OffersCatalogComponent]
    });
    fixture = TestBed.createComponent(OffersCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
