import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FoodLoggerFormPage } from './food-logger-form.page';

describe('FoodLoggerFormPage', () => {
  let component: FoodLoggerFormPage;
  let fixture: ComponentFixture<FoodLoggerFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FoodLoggerFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FoodLoggerFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
