import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ItemDescriptionComponent } from './item-description.component';

describe('ItemDescriptionComponent', () => {
  let component: ItemDescriptionComponent;
  let fixture: ComponentFixture<ItemDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemDescriptionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemDescriptionComponent);
    const itemDescriptionDebugEl = fixture.debugElement.query(By.directive(ItemDescriptionComponent));
    component = itemDescriptionDebugEl.componentInstance as ItemDescriptionComponent;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
