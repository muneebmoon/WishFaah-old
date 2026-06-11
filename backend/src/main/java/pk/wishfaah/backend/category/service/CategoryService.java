package pk.wishfaah.backend.category.service;

import pk.wishfaah.backend.category.dto.CategoryRequest;
import pk.wishfaah.backend.category.dto.CategoryResponse;

import java.util.List;

public interface CategoryService {
     CategoryResponse createCategory(CategoryRequest categoryRequest);
     List<CategoryResponse> getAllCategories();
     CategoryResponse getCategoryById(Integer id);
     CategoryResponse updateCategory(CategoryRequest categoryRequest, Integer id);
     void deleteCategory(Integer id);
}
