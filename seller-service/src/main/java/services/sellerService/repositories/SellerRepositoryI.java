package services.sellerService.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import services.sellerService.models.Seller;

@Repository
public interface SellerRepositoryI extends JpaRepository<Seller, Integer>{
}
