package pk.wishfaah.backend.product.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pk.wishfaah.backend.product.dto.ProductRequest;
import pk.wishfaah.backend.product.dto.ProductResponse;
import pk.wishfaah.backend.product.service.ProductService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    /**
     * POST /api/v1/products
     * Creates a brand-new product catalog entry.
     */
    @PostMapping
    public ResponseEntity<ProductResponse> createProduct(@Valid @RequestBody ProductRequest request) {
        ProductResponse response = productService.createProduct(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED); // 201 Created
    }

    /**
     * GET /api/v1/products?page=0&size=10&sortBy=id&direction=DESC
     * Retrieves all products with scalable pagination and sorting built-in.
     */
    @GetMapping
    public ResponseEntity<Page<ProductResponse>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "DESC") String direction) {

        // 1. Establish the sort direction context safely
        Sort.Direction sortDirection = direction.equalsIgnoreCase("ASC") ? Sort.Direction.ASC : Sort.Direction.DESC;

        // 2. Build the structural Pageable configuration object
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortBy));

        // 3. Request the chunked dataset from the service layer
        Page<ProductResponse> responsePage = productService.getAllProducts(pageable);

        return ResponseEntity.ok(responsePage);
    }

    /**
     * GET /api/v1/products/category/{categoryId}
     * Retrieves all products belonging to a specific category.
     */
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<ProductResponse>> getProductsByCategoryId(@PathVariable Integer categoryId) {
        List<ProductResponse> responseList = productService.getProductsByCategoryId(categoryId);
        return ResponseEntity.ok(responseList); // 200 OK
    }

    /**
     * GET /api/v1/products/{id}
     * Retrieves a single product by its Integer ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProductById(@PathVariable Integer id) {
        ProductResponse response = productService.getProductById(id);
        return ResponseEntity.ok(response); // 200 OK
    }

    /**
     * PUT /api/v1/products/{id}
     * Fully updates an existing product record.
     */
    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> updateProduct(
            @PathVariable Integer id,
            @Valid @RequestBody ProductRequest request) {
        ProductResponse response = productService.updateProduct(request, id);
        return ResponseEntity.ok(response); // 200 OK
    }

    /**
     * DELETE /api/v1/products/{id}
     * Removes a product safely from the database catalog.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Integer id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build(); // 204 No Content
    }
}