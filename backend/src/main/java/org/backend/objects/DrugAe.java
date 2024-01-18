package org.backend.objects;

import java.lang.reflect.Array;

public class DrugAe {

    public String drugInAdr = "";
    public String aeInAdr = "";
    public String[] context = {};
    public String adrPossibility = "";
    public String remarks = "";

    public DrugAe(){}

    @Override
    public String toString() {
        return String.format("%s, %s, %d, %s, %s", this.drugInAdr, this.aeInAdr, this.context.length, this.adrPossibility, this.remarks);
    }

    public DrugAe setDrugInAdr(String val){
        this.drugInAdr = val;
        return this;
    }

    public DrugAe setAeInAdr(String val){
        this.aeInAdr = val;
        return this;
    }

    public DrugAe setContext(String[] val){
        this.context = val;
        return this;
    }

    public DrugAe setAdrPossibility(String val){
        this.adrPossibility = val;
        return this;
    }

    public DrugAe setRemarks(String val){
        this.remarks = val;
        return this;
    }



}
