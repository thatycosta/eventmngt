package com.pw2.finalProject.EventManager.io.repository;

import com.pw2.finalProject.EventManager.io.entity.UserEntityOne;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository extends PagingAndSortingRepository<UserEntityOne, Long> {
    UserEntityOne findByEmail(String email);
    UserEntityOne findByUserId(String userId);
//
//    @Query(value = "select * from Users u where u.EMAIL_VERIFICATION_STATUS = 'true'", nativeQuery = true)
//    Page<UserEntity> findAllUsersWithConfirmedEmailAddress(Pageable pageableRequest);

}
