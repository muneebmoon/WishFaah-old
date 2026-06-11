package pk.wishfaah.backend.category.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pk.wishfaah.backend.category.dto.CategoryRequest;
import pk.wishfaah.backend.category.dto.CategoryResponse;
import pk.wishfaah.backend.category.entity.Category;
import pk.wishfaah.backend.category.exception.CategoryNotFoundException;
import pk.wishfaah.backend.category.exception.DuplicateCategoryException;
import pk.wishfaah.backend.category.repository.CategoryRepository;
import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService{

    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    @Transactional
    public CategoryResponse createCategory(CategoryRequest categoryRequest) {
        String name = categoryRequest.getName().trim();
        if (categoryRepository.existsByNameIgnoreCase(name)) {
            throw new DuplicateCategoryException("Category with name '" + name + "' already exists.");
        }

        Category category = toEntity(categoryRequest);
        Category savedCategory = categoryRepository.save(category);
        return toResponse(savedCategory);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CategoryResponse> getAllCategories() {
        return categoryRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public CategoryResponse getCategoryById(Integer id) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException(id));
        return toResponse(category);
    }

    @Override
    @Transactional
    public CategoryResponse updateCategory(CategoryRequest categoryRequest, Integer id) {
        Category existingCategory = categoryRepository.findById(id)
                .orElseThrow(() -> new CategoryNotFoundException(id));

        String newName = categoryRequest.getName().trim();
        if (!existingCategory.getName().equalsIgnoreCase(newName)) {
            if (categoryRepository.existsByNameIgnoreCase(newName)) {
                throw new DuplicateCategoryException("Category with name '" + newName + "' already exists.");
            }
        }

        existingCategory.setName(newName);
        existingCategory.setDescription(
                categoryRequest.getDescription() != null ? categoryRequest.getDescription().trim() : null
        );

        Category updatedCategory = categoryRepository.save(existingCategory);
        return toResponse(updatedCategory);
    }

    @Override
    @Transactional
    public void deleteCategory(Integer id) {
        if (!categoryRepository.existsById(id)) {
            throw new CategoryNotFoundException(id);
        }
        categoryRepository.deleteById(id);
    }

    // Helper Functions
    private Category toEntity(CategoryRequest request) {
        Category category = new Category();
        category.setName(request.getName().trim());
        category.setDescription(request.getDescription() != null ? request.getDescription().trim() : null);
        return category;
    }

    private CategoryResponse toResponse(Category category){
        CategoryResponse response = new CategoryResponse();
        response.setId(category.getId());
        response.setName(category.getName());
        response.setDescription(category.getDescription());
        response.setCreatedAt(category.getCreatedAt());
        response.setUpdatedAt(category.getUpdatedAt());
        return response;
    }
}
