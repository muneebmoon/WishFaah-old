package pk.wishfaah.backend.product.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record ProductResponse(
        Integer id,
        String title,
        BigDecimal price,
        BigDecimal salePrice,
        String shortDescription,
        String longDescription,
        boolean inStock,
        Integer categoryId,
        List<String> images,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {}