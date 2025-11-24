package ma.fstt.service.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LoginResponse {
    private String token;
    private String type = "Bearer";

    public LoginResponse(String token) {
        this.token = token;
    }
}

