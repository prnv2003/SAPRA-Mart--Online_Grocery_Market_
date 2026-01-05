package com.example.demo;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import com.sapramart.SapraMartApplication;

@SpringBootTest(classes = SapraMartApplication.class, properties = {
		"spring.autoconfigure.exclude=org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration,org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration"
})
class DemoApplicationTests {

	@Test
	void contextLoads() {
	}

}
