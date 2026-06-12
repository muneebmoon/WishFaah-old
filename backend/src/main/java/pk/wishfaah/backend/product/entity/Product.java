package pk.wishfaah.backend.product.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import pk.wishfaah.backend.category.entity.Category;

@Entity
@Table(
        name = "products",
        indexes = {
                @Index(name = "idx_product_in_stock", columnList = "in_stock"),
                @Index(name = "idx_product_stock_price", columnList = "in_stock, price"),
                @Index(name = "idx_product_created_at", columnList = "created_at")
        }
)
@Getter
@Setter
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 150)
    private String title;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(name = "sale_price", precision = 10, scale = 2)
    private BigDecimal salePrice;

    @Column(name = "short_description", length = 500)
    private String shortDescription;

    @Column(name = "long_description", columnDefinition = "TEXT")
    private String longDescription;

    @Column(name = "in_stock", nullable = false)
    private boolean inStock = true;

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(
            name = "product_images",
            joinColumns = @JoinColumn(name = "product_id", foreignKey = @ForeignKey(name = "fk_images_product"))
    )

    @Column(name = "image_url", length = 500)
    private List<String> images = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(
            name = "category_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_product_category")
    )

    private Category category;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}