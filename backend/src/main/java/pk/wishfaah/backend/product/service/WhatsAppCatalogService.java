package pk.wishfaah.backend.product.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import pk.wishfaah.backend.product.entity.Product;

import java.util.*;

@Service
public class WhatsAppCatalogService {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${meta.catalog.id}")
    private String catalogId;

    @Value("${meta.catalog.token}")
    private String catalogToken;

    @Autowired
    public WhatsAppCatalogService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public void syncProductToWhatsApp(Product product) {
        String url = "https://graph.facebook.com/v20.0/" + catalogId + "/items_batch";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setBearerAuth(catalogToken);

        try {
            // 1. Build the nested request item payload structure
            Map<String, Object> requestItem = new HashMap<>();
            requestItem.put("method", "UPDATE");
            requestItem.put("retailer_id", "PROD_" + product.getId());

            Map<String, Object> data = new HashMap<>();
            data.put("id", "PROD_" + product.getId());
            data.put("title", product.getTitle());
            data.put("description", product.getShortDescription() != null ? product.getShortDescription() : product.getTitle());
            data.put("availability", product.isInStock() ? "in stock" : "out of stock");
            data.put("condition", "new");

            String formattedPrice = product.getPrice().intValue() + " PKR";
            data.put("price", formattedPrice);

// 3. Fix Sale Price Formatting: If you have a sale price, format it the same way
            if (product.getSalePrice() != null) {
                String formattedSalePrice = product.getSalePrice().intValue() + " PKR";
                data.put("sale_price", formattedSalePrice);
            }

            String imageUrl = (product.getImages() != null && !product.getImages().isEmpty())
                    ? product.getImages().get(0)
                    : "https://wishfaah.pk/placeholder.jpg";
            data.put("image_link", imageUrl);
            data.put("link", "https://wishfaah.pk/products/" + product.getId());

            requestItem.put("data", data);
            List<Map<String, Object>> requestsList = Collections.singletonList(requestItem);

            String jsonRequestsPayload = objectMapper.writeValueAsString(requestsList);

            // 2. Wrap parameters inside the Form Body
            MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
            body.add("requests", jsonRequestsPayload);

            // 🔥 THE FIX: Explicitly append the required item_type key parameter
            body.add("item_type", "PRODUCT_ITEM");

            HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(body, headers);

            // 3. Fire the updated request block
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);

            if (response.getStatusCode().is2xxSuccessful()) {
                System.out.println("🎉 Product successfully synced to WhatsApp Catalog! Meta Response: " + response.getBody());
            }
        } catch (Exception e) {
            System.err.println("❌ WhatsApp Sync Failed for Product ID " + product.getId() + ": " + e.getMessage());
        }
    }
}