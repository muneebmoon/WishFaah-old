package pk.wishfaah.backend.customer.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import java.util.List;

public record CustomerRequest(
        @NotBlank(message = "Name cannot be blank")
        @Size(max = 100, message = "Name cannot exceed 100 characters")
        String name,

        @NotBlank(message = "Email is required")
        @Email(message = "Please provide a valid email address")
        @Size(max = 150, message = "Email cannot exceed 150 characters")
        String email,

        @NotBlank(message = "Password is required")
        @Size(min = 6, max = 32, message = "Password must be between 6 and 32 characters long")
        String password,

        @NotBlank(message = "Primary phone number is required")
        @Size(max = 20, message = "Phone number cannot exceed 20 characters")
        String primaryPhoneNumber,

        @Size(max = 20, message = "Secondary phone number cannot exceed 20 characters")
        String secondaryPhoneNumber,

        @Valid // Cascades validation down to every address object inside the list
        List<AddressDto> addresses
) {}