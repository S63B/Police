package Project.Services;

import Project.DAO.LicensePlateDao;
import com.S63B.domain.Entities.LicensePlate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

/**
 * Created by arjan on 6-6-2017.
 */
@Service
@Transactional
public class LicensePlateService {
    private LicensePlateDao licensePlateDao;

    @Autowired
    public LicensePlateService(LicensePlateDao licensePlateDao){
        this.licensePlateDao = licensePlateDao;
    }

    public LicensePlate getCarByLicenseplate(String licensePlate){
        return licensePlateDao.findByLicense(licensePlate);
    }

}
