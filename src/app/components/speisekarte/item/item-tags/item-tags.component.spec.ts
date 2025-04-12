import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTagsComponent } from './item-tags.component';

describe('ItemTagsComponent', () => {
  let component: ItemTagsComponent;
  let fixture: ComponentFixture<ItemTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemTagsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
