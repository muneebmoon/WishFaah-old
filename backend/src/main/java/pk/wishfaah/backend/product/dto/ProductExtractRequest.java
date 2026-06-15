package pk.wishfaah.backend.product.dto;

import lombok.Data;

@Data
public class ProductExtractRequest {

    /**
     * Raw product text pasted by admin
     * Example: supplier description, WhatsApp text, etc.
     */
    private String rawText;
}