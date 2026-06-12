package pk.wishfaah.backend.product.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pk.wishfaah.backend.product.entity.Product;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    //Fetch products belonging to a specific category
    List<Product> findByCategoryId(Integer categoryId);

}