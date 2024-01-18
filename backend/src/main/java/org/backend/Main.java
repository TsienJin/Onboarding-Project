package org.backend;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(
        exclude = {
                DataSourceAutoConfiguration.class
        }
)
public class Main {
    public static void main(String[] args) {
        System.out.println("Backend Running!");
        SpringApplication.run(Main.class, args);
    }
}