package Project.Services;

import Project.DAO.CarDao;
import com.S63B.domain.Entities.Car;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class PoliceService {
    private CarDao carDao;

    @Autowired
    public PoliceService(CarDao carDao){
        this.carDao = carDao;
    }

    public Car getCar(int carID){
       // return carDao.findOne(carID);
        return carDao.findOne(carID);
    }

    public Car setStolen(int carID, boolean stolen){
        Car car = carDao.findOne(carID);

        if (car == null){
            return null;
        }

        car.setStolen(stolen);
        carDao.save(car);

        return car;
    }

    public List<Car> getStolenCars(){
        return carDao.findByIsStolen(true);
    }
}
