import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecPagePage } from './rec-page.page';

describe('RecPagePage', () => {
  let component: RecPagePage;
  let fixture: ComponentFixture<RecPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
