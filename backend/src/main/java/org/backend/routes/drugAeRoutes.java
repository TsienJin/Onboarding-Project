package org.backend.routes;


import org.backend.objects.DrugAe;
import org.backend.objects.endpointObjects.AeSubmit;
import org.backend.util.PayloadManager;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/ae")
public class drugAeRoutes {

    @PostMapping("/submit")
    public ResponseEntity<?> submitDrugAe(@RequestBody String payload){
        AeSubmit res = new PayloadManager().jsonStringTo(AeSubmit.class, payload);
        for (DrugAe drugAe : res.drugAes) {
            System.out.println(drugAe);
        }
        return new ResponseEntity<String>("Ok!", HttpStatus.OK);
    }

    @GetMapping("/get")
    public DrugAe[] getDrugAe(){
        DrugAe d1 = new DrugAe()
                .setDrugInAdr("drug1")
                .setAeInAdr("ae1")
                .setAdrPossibility("true")
                .setRemarks("remarks1")
                .setContext(new String[]{
                        "Ctx1",
                        "Ctx2"
                });

        DrugAe d2 = new DrugAe()
                .setDrugInAdr("drug2")
                .setAeInAdr("ae2")
                .setAdrPossibility("false")
                .setRemarks("remarks2")
                .setContext(new String[]{
                        "Ctx1",
                        "Ctx2",
                        "Ctx3",
                        "Ctx4",
                });

        DrugAe d3 = new DrugAe()
                .setDrugInAdr("drug3")
                .setAeInAdr("ae3")
                .setAdrPossibility("uncertain")
                .setRemarks("remarks3")
                .setContext(new String[]{
                        "Ctx1",
                });

        return new DrugAe[]{d1, d2, d3};
    }
}
