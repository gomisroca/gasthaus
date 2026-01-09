import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ItemDescriptionComponent } from './item-description.component';

@Component({
  standalone: true,
  imports: [ItemDescriptionComponent],
  templateUrl: './item-description.component.html',
})
class TestComponent {}

describe('ItemDescriptionComponent', () => {
  let component: ItemDescriptionComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    const itemTagDebugEl = fixture.debugElement.query(By.directive(ItemDescriptionComponent));
    component = itemTagDebugEl.componentInstance as ItemDescriptionComponent;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
