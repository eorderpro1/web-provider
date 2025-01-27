import { Component, inject } from '@angular/core';
import { ThemeCssVariableService } from '../../../../core/services/theme-css-variable.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-orders-management',
    standalone: true,
    imports: [
      NgbDropdownModule,
    ],
  templateUrl: './orders-management.component.html',
  styleUrl: './orders-management.component.scss'
})
export class OrdersManagementComponent {

  themeCssVariables = inject(ThemeCssVariableService).getThemeCssVariables();

}
