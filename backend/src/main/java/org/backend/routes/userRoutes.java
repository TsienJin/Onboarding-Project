package org.backend.routes;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/user")
public class userRoutes {

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> payload){
        try{
            String username = payload.get("username");
            String password = payload.get("password");

            if(Objects.equals(username, "username") && Objects.equals(password, "password")){
                return new ResponseEntity<String>("Login successful!", HttpStatus.OK);
            } else {
                return new ResponseEntity<String>("Incorrect login credentials!", HttpStatus.UNAUTHORIZED);
            }

        } catch (Exception e) {
            return new ResponseEntity<String>("Missing parameters!", HttpStatus.BAD_REQUEST);
        }
    }

}
