package Project.Rest;

import Project.Services.PoliceService;
import com.S63B.domain.Entities.Car;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/police")
public class PoliceRest {

    private PoliceService policeService;

    @Autowired
    public PoliceRest(PoliceService policeService){
        this.policeService = policeService;
    }

    @RequestMapping(value = "{id}", method = RequestMethod.GET)
    public ResponseEntity<Car> getCar(@PathVariable("id") int id) {
        HttpStatus status = HttpStatus.OK;

        Car car = policeService.getCar(id);

        System.out.println("Carid: " + id);
        System.out.println("Car: " + car);

        if (car == null){
            status = HttpStatus.NO_CONTENT;
        }

        return new ResponseEntity<>(car, status);
    }

    @RequestMapping(value = "{id}/{stolen}", method = RequestMethod.POST)
    public ResponseEntity<Car> setStolen(@PathVariable("id") int id, @PathVariable("stolen") boolean stolen) {
        HttpStatus status = HttpStatus.OK;

        Car car = policeService.setStolen(id, stolen);

        if (car == null){
            status = HttpStatus.NO_CONTENT;
        }

        return new ResponseEntity<>(car, status);
    }
}
