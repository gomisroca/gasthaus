import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemImageComponent } from './item-image.component';

describe('ItemImageComponent', () => {
  let component: ItemImageComponent;
  let fixture: ComponentFixture<ItemImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemImageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
