import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ItemTagComponent } from './item-tag.component';

@Component({
  imports: [ItemTagComponent],
  template: `<app-item-tag [tag]="'vegan'"></app-item-tag>`,
})
class TestHostComponent {}

describe('ItemTagComponent', () => {
  let component: ItemTagComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    const itemTagDebugEl = fixture.debugElement.query(By.directive(ItemTagComponent));
    component = itemTagDebugEl.componentInstance as ItemTagComponent;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
