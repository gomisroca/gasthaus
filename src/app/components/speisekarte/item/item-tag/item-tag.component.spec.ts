import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTagComponent } from './item-tag.component';

describe('ItemTagComponent', () => {
  let component: ItemTagComponent;
  let fixture: ComponentFixture<ItemTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemTagComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
