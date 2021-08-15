package com.pw2.finalProject.EventManager.controller;

import com.pw2.finalProject.EventManager.dto.EventDto;
import com.pw2.finalProject.EventManager.request.EventRequest;
import com.pw2.finalProject.EventManager.response.EventResponse;
import com.pw2.finalProject.EventManager.service.EventService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("events")
public class EventController {

    @Autowired
    EventService eventService;


    @PostMapping
    public EventResponse createEvent(@RequestBody EventRequest eventRequest){
        EventResponse returnValue = new EventResponse();

        ModelMapper modelMapper = new ModelMapper();
        EventDto eventDto = modelMapper.map(eventRequest,  EventDto.class);

        EventDto createdEvent = eventService.createEvent(eventDto);

        returnValue = modelMapper.map(createdEvent, EventResponse.class);

        return returnValue;
    }

    @GetMapping()
    public ResponseEntity<List<EventResponse>> getEvents(@RequestParam(value = "page", defaultValue = "0") int page,
                                                                  @RequestParam(value = "limit", defaultValue = "6") int limit){
        List<EventResponse> returnValue = new ArrayList<>();

        List<EventDto> events = eventService.getEvents(page, limit);
        long totalElements = eventService.getTotalEvents(page, limit);

        String str = new StringBuilder().append(totalElements).toString();

        for(EventDto eventDto : events){
            ModelMapper modelMapper = new ModelMapper();
            EventResponse eventModel = modelMapper.map(eventDto, EventResponse.class);
            returnValue.add(eventModel);
        }

        var headers = new HttpHeaders();
        headers.add("totalElements", str);

        Collections.reverse(returnValue);

        return ResponseEntity.accepted().headers(headers).body(returnValue);
    }

    @GetMapping(path="/name/{name}")
    public EventResponse getEventByName(@PathVariable String name){
        ModelMapper modelMapper = new ModelMapper();

        EventResponse returnValue = new EventResponse();

        EventDto storedEvent = eventService.getEventByName(name);
        returnValue = modelMapper.map(storedEvent, EventResponse.class);

        return returnValue;
    }

    @GetMapping(path="/id/{id}")
    public EventResponse getEventById(@PathVariable long id){
        ModelMapper modelMapper = new ModelMapper();

        EventResponse returnValue = new EventResponse();

        EventDto storedEvent = eventService.getEventById(id);
        returnValue = modelMapper.map(storedEvent, EventResponse.class);
        returnValue.setParticipants(storedEvent.getEventsentitiesone().size());

        return returnValue;
    }

    @GetMapping(path="total/page/{page}")
    public ResponseEntity<List<EventResponse>> getAllEvents(@PathVariable long page){
        List<EventResponse> returnValue = new ArrayList<>();

        List<EventDto> events = eventService.getAllEvents();
        long totalElements = eventService.getAllEvents().size();

        String str = new StringBuilder().append(totalElements).toString();

        for(EventDto eventDto : events){
            ModelMapper modelMapper = new ModelMapper();
            EventResponse eventModel = modelMapper.map(eventDto, EventResponse.class);

            returnValue.add(eventModel);
        }

        Collections.reverse(returnValue);

        var headers = new HttpHeaders();
        headers.add("totalElements", str);


        return ResponseEntity.accepted().headers(headers).body(returnValue);
    }

    @PostMapping(path = "/likes/{id}")
    public EventResponse likeEvent(@PathVariable long id){
        EventResponse returnValue = new EventResponse();

        EventDto eventDto = eventService.getEventById(id);
        eventService.likeEvent(eventDto);

        EventDto eventDtoLikedResponse = eventService.getEventById(id);
        BeanUtils.copyProperties(eventDtoLikedResponse, returnValue);

        return returnValue;
    }

}