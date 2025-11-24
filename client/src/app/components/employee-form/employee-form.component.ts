import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService, Employee } from '../../services/employee.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css'
})
export class EmployeeFormComponent implements OnInit {
  employee: Employee = {
    firstName: '',
    lastName: '',
    email: '',
    salary: 0
  };
  isEdit = false;
  error = '';

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.employeeService.getById(+id).subscribe({
        next: (data) => {
          this.employee = data;
        },
        error: () => {
          this.router.navigate(['/employes']);
        }
      });
    }
  }

  onSubmit() {
    this.error = '';
    if (this.isEdit && this.employee.id) {
      this.employeeService.update(this.employee.id, this.employee).subscribe({
        next: () => {
          this.router.navigate(['/employes']);
        },
        error: () => {
          this.error = 'Erreur lors de la modification';
        }
      });
    } else {
      this.employeeService.create(this.employee).subscribe({
        next: () => {
          this.router.navigate(['/employes']);
        },
        error: () => {
          this.error = 'Erreur lors de la création';
        }
      });
    }
  }

  annuler() {
    this.router.navigate(['/employes']);
  }
}

