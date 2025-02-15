import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurationTemplateComponent } from './configuration-template.component';

describe('ConfigurationTemplateComponent', () => {
  let component: ConfigurationTemplateComponent;
  let fixture: ComponentFixture<ConfigurationTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigurationTemplateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurationTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
