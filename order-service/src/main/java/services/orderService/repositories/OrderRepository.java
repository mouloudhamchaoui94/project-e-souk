package services.orderService.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import services.orderService.models.Order;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findByCid(int cid);
}
