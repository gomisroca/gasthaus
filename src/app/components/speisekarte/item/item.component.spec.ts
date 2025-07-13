import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ItemComponent } from './item.component';

@Component({
  standalone: true,
  imports: [ItemComponent],
  template: `<app-item
    [item]="{
      id: '1',
      name: 'Test',
      description: 'This is a test item',
      price: 10,
      categories: ['vegan'],
      tags: ['spicy'],
      seasonal: false,
      image: null,
    }"></app-item>`,
})
class TestComponent {}

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    const itemDebugEl = fixture.debugElement.query(By.directive(ItemComponent));
    component = itemDebugEl.componentInstance as ItemComponent;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
