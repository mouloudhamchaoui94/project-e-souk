package services.clientService.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import services.clientService.models.Client;

@Repository
public interface ClientRepositoryI extends JpaRepository<Client, Integer> {
}
