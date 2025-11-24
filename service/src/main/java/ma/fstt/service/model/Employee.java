package ma.fstt.service.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "employes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Le prénom est requis")
    @Column(nullable = false)
    private String firstName;

    @NotBlank(message = "Le nom est requis")
    @Column(nullable = false)
    private String lastName;

    @NotBlank(message = "L'email est requis")
    @Email(message = "Email invalide")
    @Column(nullable = false, unique = true)
    private String email;

    @NotNull(message = "Le salaire est requis")
    @Positive(message = "Le salaire doit être positif")
    @Column(nullable = false)
    private Double salary;
}

