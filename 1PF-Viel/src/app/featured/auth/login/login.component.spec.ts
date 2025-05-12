import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../../core/services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize the form with default values', () => {
    expect(component.loginForm.value).toEqual({
      email: 'admin@admin',
      password: ''
    });
  });
  it('should mark the form as invalid if the imports are empty', () => {
    component.loginForm.setValue({email:'', password: ''})
    expect(component.loginForm.valid).toBeFalse();
  });
  
  it('should mark the form as invalid if password is less than 3 characters', () => {
    component.loginForm.setValue({email:'', password: 'admin'})
    expect(component.loginForm.valid).toBeTrue();
  });

  it('should call authService.login and navigate to dashboard if the form is valid', () => {
    const AuthServiceSpy = spyOn(component['authService'],'login').and.returnValue(true);
    const routerSpy = spyOn(component['router'], 'navigate');
    component.loginForm.setValue({email:'admin@admin', password: '123'})
    component.submit();
    expect(AuthServiceSpy).toHaveBeenCalledWith('admin@admin','123');
    expect(routerSpy).toHaveBeenCalledOnceWith(['/dashboard']);
  });
  
  it('should show an alert if login fails', () => {
        const AuthServiceSpy = spyOn(component['authService'],'login').and.returnValue(false);
    const alertSpy = spyOn(window, 'alert');
    component.loginForm.setValue({email:'admin@admin', password: '123'})
    component.submit();
    expect(alertSpy).toHaveBeenCalledWith('Email o contraseña incorrecta');
  });
  
});
