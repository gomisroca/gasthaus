import { Component, LOCALE_ID } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ItemComponent } from './item.component';

@Component({
  imports: [ItemComponent],
  template: `<app-item
    [item]="{
      id: '1',
      name: 'Test',
      description: 'This is a test item',
      priceCents: 1000,
      categories: ['vegan'],
      ingredients: ['eggs', 'cheese'],
      tags: ['spicy'],
      seasonal: false,
      image: null,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    }"></app-item>`,
  providers: [{ provide: LOCALE_ID, useValue: 'de' }],
})
class TestHostComponent {}

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    const itemDebugEl = fixture.debugElement.query(By.directive(ItemComponent));
    component = itemDebugEl.componentInstance as ItemComponent;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
