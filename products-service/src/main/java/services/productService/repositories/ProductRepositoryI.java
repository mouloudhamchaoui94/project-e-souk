package services.productService.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import services.productService.models.Product;

@Repository
public interface ProductRepositoryI extends JpaRepository<Product, Integer>{
	List<Product> findByName(String name);
	List<Product> findByCategory(String cat);

}
