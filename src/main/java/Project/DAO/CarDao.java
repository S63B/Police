package Project.DAO;

import com.S63B.domain.Entities.Car;
import com.S63B.domain.Entities.LicensePlate;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarDao extends CrudRepository<Car, Integer> {
    List<Car> findByIsStolen(boolean isStolen);
    Car findByLicensePlate(LicensePlate licensePlate);
}
