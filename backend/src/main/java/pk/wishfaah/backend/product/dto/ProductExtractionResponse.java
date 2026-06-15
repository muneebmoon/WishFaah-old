package pk.wishfaah.backend.product.dto;

import lombok.Data;

@Data
public class ProductExtractionResponse {

    private String productTitle;
    private Double regularPrice;
    private Double salePrice;
    private String shortDescription;
    private String longDescription;
}