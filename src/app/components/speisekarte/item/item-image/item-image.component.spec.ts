import { Component } from '@angular/core';
import { type ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ItemImageComponent } from './item-image.component';

@Component({
  imports: [ItemImageComponent],
  template: `<app-item-image name="Test Item" [image]="null"></app-item-image>`,
})
class TestHostComponent {}

describe('ItemImageComponent', () => {
  let component: ItemImageComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    const el = fixture.debugElement.query(By.directive(ItemImageComponent));
    component = el.componentInstance as ItemImageComponent;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
