package pk.wishfaah.backend.category.controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pk.wishfaah.backend.category.dto.CategoryRequest;
import pk.wishfaah.backend.category.dto.CategoryResponse;
import pk.wishfaah.backend.category.service.CategoryService;

import java.util.List;

@RestController
@RequestMapping("/api/v1/categories")
public class CategoryController {

    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    /**
     * POST /api/v1/categories
     * Creates a new product category.
     */
    @PostMapping
    public ResponseEntity<CategoryResponse> createCategory(@Valid @RequestBody CategoryRequest request) {
        CategoryResponse response = categoryService.createCategory(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED); // 201 Created is proper REST for POST
    }

    /**
     * GET /api/v1/categories
     * Retrieves all categories.
     */
    @GetMapping
    public ResponseEntity<List<CategoryResponse>> getAllCategories() {
        List<CategoryResponse> responseList = categoryService.getAllCategories();
        return ResponseEntity.ok(responseList); // 200 OK
    }

    /**
     * GET /api/v1/categories/{id}
     * Retrieves a single category by its Integer ID.
     */
    @GetMapping("/{id}")
    public ResponseEntity<CategoryResponse> getCategoryById(@PathVariable Integer id) {
        CategoryResponse response = categoryService.getCategoryById(id);
        return ResponseEntity.ok(response); // 200 OK
    }

    /**
     * PUT /api/v1/categories/{id}
     * Updates an entire category by its Integer ID.
     */
    @PutMapping("/{id}")
    public ResponseEntity<CategoryResponse> updateCategory(
            @PathVariable Integer id,
            @Valid @RequestBody CategoryRequest request) {
        CategoryResponse response = categoryService.updateCategory(request, id);
        return ResponseEntity.ok(response); // 200 OK
    }

    /**
     * DELETE /api/v1/categories/{id}
     * Deletes a category by its Integer ID.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Integer id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.noContent().build(); // 244 No Content is proper REST for empty DELETE responses
    }
}