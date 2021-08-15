package com.pw2.finalProject.EventManager.service;

import com.pw2.finalProject.EventManager.dto.EventDto;

import java.util.List;

public interface EventService {
    EventDto createEvent(EventDto event);
    List<EventDto> getEvents(int page, int limit);
    EventDto getEventByName(String name);
    List<EventDto> getAllEvents();
    EventDto getEventById(long id);
    long getTotalEvents(int page, int limit);
    void likeEvent(EventDto event);
}
