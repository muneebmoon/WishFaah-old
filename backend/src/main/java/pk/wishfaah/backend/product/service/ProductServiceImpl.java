package pk.wishfaah.backend.product.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pk.wishfaah.backend.category.entity.Category;
import pk.wishfaah.backend.category.exception.CategoryNotFoundException;
import pk.wishfaah.backend.category.repository.CategoryRepository;
import pk.wishfaah.backend.product.dto.ProductRequest;
import pk.wishfaah.backend.product.dto.ProductResponse;
import pk.wishfaah.backend.product.entity.Product;
import pk.wishfaah.backend.product.exception.InvalidProductPriceException;
import pk.wishfaah.backend.product.exception.ProductNotFoundException;
import pk.wishfaah.backend.product.repository.ProductRepository;

import java.math.BigDecimal;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    @Transactional
    public ProductResponse createProduct(ProductRequest request) {
        // 1. Validate pricing business rules
        validateProductPricing(request.price(), request.salePrice());

        // 2. Verify that the requested category exists
        Category category = categoryRepository.findById(request.categoryId())
                .orElseThrow(() -> new CategoryNotFoundException(request.categoryId()));

        // 3. Map, link relationship, and save
        Product product = toEntity(request);
        product.setCategory(category);

        Product savedProduct = productRepository.save(product);
        return toResponse(savedProduct);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ProductResponse> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable)
                .map(this::toResponse); // Natively maps Page<Product> directly to Page<ProductResponse>
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponse> getProductsByCategoryId(Integer categoryId) {
        // Optional safety: check if category exists first
        if (!categoryRepository.existsById(categoryId)) {
            throw new CategoryNotFoundException(categoryId);
        }

        return productRepository.findByCategoryId(categoryId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public ProductResponse getProductById(Integer id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));
        return toResponse(product);
    }

    @Override
    @Transactional
    public ProductResponse updateProduct(ProductRequest request, Integer id) {
        // 1. Fetch the existing product
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException(id));

        // 2. Validate pricing business rules
        validateProductPricing(request.price(), request.salePrice());

        // 3. Update category linkage if it has changed
        if (!existingProduct.getCategory().getId().equals(request.categoryId())) {
            Category newCategory = categoryRepository.findById(request.categoryId())
                    .orElseThrow(() -> new CategoryNotFoundException(request.categoryId()));
            existingProduct.setCategory(newCategory);
        }

        // 4. Update fields
        existingProduct.setTitle(request.title().trim());
        existingProduct.setPrice(request.price());
        existingProduct.setSalePrice(request.salePrice());
        existingProduct.setShortDescription(request.shortDescription() != null ? request.shortDescription().trim() : null);
        existingProduct.setLongDescription(request.longDescription() != null ? request.longDescription().trim() : null);
        existingProduct.setInStock(request.inStock());

        // Handle image string list collection update safely
        existingProduct.getImages().clear();
        if (request.images() != null) {
            existingProduct.getImages().addAll(request.images());
        }

        Product updatedProduct = productRepository.save(existingProduct);
        return toResponse(updatedProduct);
    }

    @Override
    @Transactional
    public void deleteProduct(Integer id) {
        if (!productRepository.existsById(id)) {
            throw new ProductNotFoundException(id);
        }
        productRepository.deleteById(id);
    }

    // --- Helper Business Validation Logic ---

    private void validateProductPricing(BigDecimal price, BigDecimal salePrice) {
        if (salePrice != null && salePrice.compareTo(price) > 0) {
            throw new InvalidProductPriceException("Sale price cannot be greater than the original regular price.");
        }
    }

    // --- Mapping Helpers ---

    private Product toEntity(ProductRequest request) {
        Product product = new Product();
        product.setTitle(request.title().trim());
        product.setPrice(request.price());
        product.setSalePrice(request.salePrice());
        product.setShortDescription(request.shortDescription() != null ? request.shortDescription().trim() : null);
        product.setLongDescription(request.longDescription() != null ? request.longDescription().trim() : null);
        product.setInStock(request.inStock() != null ? request.inStock() : true);
        if (request.images() != null) {
            product.setImages(request.images());
        }
        return product;
    }

    private ProductResponse toResponse(Product product) {
        return new ProductResponse(
                product.getId(),
                product.getTitle(),
                product.getPrice(),
                product.getSalePrice(),
                product.getShortDescription(),
                product.getLongDescription(),
                product.isInStock(),
                product.getCategory().getId(),
                product.getImages(),
                product.getCreatedAt(),
                product.getUpdatedAt()
        );
    }
}