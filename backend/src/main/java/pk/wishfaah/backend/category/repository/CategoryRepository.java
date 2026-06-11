package pk.wishfaah.backend.category.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pk.wishfaah.backend.category.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    boolean existsByNameIgnoreCase(String name);
}
