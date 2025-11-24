import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EmployeeService, Employee } from '../../services/employee.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit {
  employes: Employee[] = [];
  loading = false;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadEmployes();
  }

  loadEmployes() {
    this.loading = true;
    this.employeeService.getAll().subscribe({
      next: (data) => {
        this.employes = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  ajouter() {
    this.router.navigate(['/employes/nouveau']);
  }

  modifier(id: number) {
    this.router.navigate(['/employes/modifier', id]);
  }

  details(id: number) {
    this.router.navigate(['/employes', id]);
  }

  supprimer(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet employé ?')) {
      this.employeeService.delete(id).subscribe({
        next: () => {
          this.loadEmployes();
        }
      });
    }
  }

  logout() {
    this.authService.logout();
  }
}

