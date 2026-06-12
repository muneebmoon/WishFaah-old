package pk.wishfaah.backend.product.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import pk.wishfaah.backend.product.dto.ProductRequest;
import pk.wishfaah.backend.product.dto.ProductResponse;

import java.util.List;


public interface ProductService {
    ProductResponse createProduct(ProductRequest productRequest);

    // Updated: Accepts Pageable parameters and returns a Page wrapper
    Page<ProductResponse> getAllProducts(Pageable pageable);

    List<ProductResponse> getProductsByCategoryId(Integer categoryId);
    ProductResponse getProductById(Integer id);
    ProductResponse updateProduct(ProductRequest productRequest, Integer id);
    void deleteProduct(Integer id);
}