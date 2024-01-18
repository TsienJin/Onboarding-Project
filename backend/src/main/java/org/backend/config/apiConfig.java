package org.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@ConfigurationProperties(prefix = "api")
public class apiConfig {

    private final Config config = new Config();

    public Config getConfig() {
        return config;
    }

    public static class Config {
        private final Cors cors = new Cors();

        public Cors getCors() {
            return cors;
        }

        public static class Cors {
            private List<String> allow;

            public List<String> getAllow() {
                return allow;
            }

            public void setAllow(List<String> allow) {
                this.allow = allow;
            }
        }
    }
}