import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService, Employee } from '../../services/employee.service';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.css'
})
export class EmployeeDetailComponent implements OnInit {
  employee: Employee | null = null;
  loading = false;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loading = true;
      this.employeeService.getById(+id).subscribe({
        next: (data) => {
          this.employee = data;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.router.navigate(['/employes']);
        }
      });
    }
  }

  modifier() {
    if (this.employee?.id) {
      this.router.navigate(['/employes/modifier', this.employee.id]);
    }
  }

  retour() {
    this.router.navigate(['/employes']);
  }
}

