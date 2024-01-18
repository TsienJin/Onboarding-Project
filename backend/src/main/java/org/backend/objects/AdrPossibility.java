package org.backend.objects;

public enum AdrPossibility {
    TRUE("true"),
    FALSE("false"),
    UNCERTAIN("uncertain"),
    NULL("");

    private final String value;

    AdrPossibility(String str){
        this.value = str;
    }
}
