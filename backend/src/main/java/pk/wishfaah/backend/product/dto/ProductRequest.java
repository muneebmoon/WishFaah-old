package pk.wishfaah.backend.product.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.util.List;

public record ProductRequest(
        @NotBlank(message = "Product title cannot be blank")
        @Size(max = 150, message = "Title cannot exceed 150 characters")
        String title,

        @NotNull(message = "Price is required")
        @Positive(message = "Price must be greater than zero")
        BigDecimal price,

        @Positive(message = "Sale price must be greater than zero")
        BigDecimal salePrice,

        @Size(max = 500, message = "Short description cannot exceed 500 characters")
        String shortDescription,

        String longDescription,

        Boolean inStock,

        @NotNull(message = "Category ID is required")
        Integer categoryId,

        List<String> images
) {}