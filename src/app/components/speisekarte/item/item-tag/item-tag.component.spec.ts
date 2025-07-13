import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ItemTagComponent } from './item-tag.component';

@Component({
  standalone: true,
  imports: [ItemTagComponent],
  template: `<app-item-tag [tag]="'vegan'"></app-item-tag>`,
})
class TestComponent {}

describe('ItemTagComponent', () => {
  let component: ItemTagComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    const itemTagDebugEl = fixture.debugElement.query(By.directive(ItemTagComponent));
    component = itemTagDebugEl.componentInstance as ItemTagComponent;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
