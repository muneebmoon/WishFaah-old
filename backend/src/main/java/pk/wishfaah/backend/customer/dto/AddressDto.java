package pk.wishfaah.backend.customer.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record AddressDto(
        @NotBlank(message = "Address label is required (e.g., 'Home', 'Office')")
        @Size(max = 50, message = "Label cannot exceed 50 characters")
        String label,

        @NotBlank(message = "Full delivery address is required")
        @Size(max = 500, message = "Address details cannot exceed 500 characters")
        String fullAddress,

        @NotBlank(message = "City name is required")
        @Size(max = 100, message = "City cannot exceed 100 characters")
        String city
) {}