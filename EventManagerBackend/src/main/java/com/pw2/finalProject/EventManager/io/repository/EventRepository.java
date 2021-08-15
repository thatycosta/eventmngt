package com.pw2.finalProject.EventManager.io.repository;

import com.pw2.finalProject.EventManager.io.entity.EventEntityOne;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends PagingAndSortingRepository<EventEntityOne, Long> {
    EventEntityOne findEventByName(String name);
    EventEntityOne findEventById(long id);
}