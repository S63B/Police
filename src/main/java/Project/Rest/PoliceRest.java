package Project.Rest;

import Project.Services.CarOwnerService;
import Project.Services.PoliceService;
import com.S63B.domain.Entities.Car;
import com.S63B.domain.Entities.Owner;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.Response;
import java.util.List;

import static javax.ws.rs.core.Response.Status.OK;
import static javax.ws.rs.core.Response.Status.REQUEST_TIMEOUT;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/police")
public class PoliceRest {

    private PoliceService policeService;
    private CarOwnerService carOwnerService;

    @Autowired
    public PoliceRest(PoliceService policeService, CarOwnerService carOwnerService){
        this.policeService = policeService;
        this.carOwnerService = carOwnerService;
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

    @RequestMapping(value = "{id}/owner", method = RequestMethod.GET)
    public ResponseEntity<Owner> getCurrentOwner(@PathVariable("id") int id) {
        HttpStatus status = HttpStatus.OK;

        Car getCar = policeService.getCar(id);
        Owner currentOwner = null;
        if(getCar != null){
            currentOwner = carOwnerService.getCurrentOwnerByCar(getCar);
        }
        if(currentOwner == null){
            status = HttpStatus.NO_CONTENT;
        }
        return new ResponseEntity<>(currentOwner, status);
    }

    @RequestMapping(value = "{id}/owner_history", method = RequestMethod.GET)
    public ResponseEntity<List<Owner>> getOwnerHistory(@PathVariable("id") int id) {
        HttpStatus status = HttpStatus.OK;

        Car getCar = policeService.getCar(id);
        List<Owner> ownerHistory = null;
        if(getCar != null){
            ownerHistory = carOwnerService.getCarOwnerHistory(getCar);
        }
        if(ownerHistory == null){
            status = HttpStatus.NO_CONTENT;
        }
        return new ResponseEntity<>(ownerHistory, status);
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

    /**
     * Returns a list of stolen cars.
     * Sample request: GET http://localhost:8080/police/stolen_cars
     * @return List of stolen cars if successful else the error message.
     */
    @RequestMapping(value = "stolen_cars", method = RequestMethod.GET)
    public Response getStolenCars(){
        GenericEntity<List<Car>> cars = new GenericEntity<List<Car>>(policeService.getStolenCars()) {};

        if(cars!=null){
            return Response.status(OK).entity(cars).build();
        }
        return Response.status(REQUEST_TIMEOUT).entity("Something went wrong.").build();
    }
}
