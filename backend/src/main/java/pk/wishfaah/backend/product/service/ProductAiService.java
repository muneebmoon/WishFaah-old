package pk.wishfaah.backend.product.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import pk.wishfaah.backend.product.dto.ProductExtractionResponse;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ProductAiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final ObjectMapper objectMapper = new ObjectMapper();

    private static final String GEMINI_URL =
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent";

    public ProductExtractionResponse extractProductDetails(String rawText) {

        try {

            String prompt = """
                    You are an expert e-commerce product extractor.

                    Extract the following fields:

                    - productTitle
                    - regularPrice
                    - salePrice
                    - shortDescription
                    - longDescription

                    Return ONLY valid JSON.

                    Example:

                    {
                      "productTitle": "",
                      "regularPrice": 0,
                      "salePrice": 0,
                      "shortDescription": "",
                      "longDescription": ""
                    }
                    
                    Strict Instructions:
                    - Regular price should be above 1000 rupees from given price.
                    - Sale price should be above exact 300 rupees from given price.
                    - Short Description should be concise and perfect and minimum 300 characters.
                    - Long Description should be detailed and minimum 600 characters.

                    Product Text:
                    """ + rawText;

            Map<String, Object> body = Map.of(
                    "contents", List.of(
                            Map.of(
                                    "parts", List.of(
                                            Map.of("text", prompt)
                                    )
                            )
                    )
            );

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, Object>> entity =
                    new HttpEntity<>(body, headers);

            RestTemplate restTemplate = new RestTemplate();

            ResponseEntity<String> response = restTemplate.exchange(
                    GEMINI_URL + "?key=" + apiKey,
                    HttpMethod.POST,
                    entity,
                    String.class
            );

            JsonNode root = objectMapper.readTree(response.getBody());

            String jsonText = root
                    .path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();

            // Remove markdown if Gemini returns ```json
            jsonText = jsonText
                    .replace("```json", "")
                    .replace("```", "")
                    .trim();

            return objectMapper.readValue(
                    jsonText,
                    ProductExtractionResponse.class
            );

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to extract product details: " + e.getMessage());
        }
    }
}