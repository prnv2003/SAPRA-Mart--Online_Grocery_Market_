package com.sapramart.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.sapramart.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
