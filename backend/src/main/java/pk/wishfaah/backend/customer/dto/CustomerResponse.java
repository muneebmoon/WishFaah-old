package pk.wishfaah.backend.customer.dto;

import java.time.LocalDateTime;
import java.util.List;

public record CustomerResponse(
        Integer id,
        String name,
        String email,
        String primaryPhoneNumber,
        String secondaryPhoneNumber,
        List<AddressDto> addresses,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {}