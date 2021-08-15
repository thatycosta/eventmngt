package com.pw2.finalProject.EventManager.service.impl;

import com.pw2.finalProject.EventManager.dto.EventDto;
import com.pw2.finalProject.EventManager.io.entity.EventEntityOne;
import com.pw2.finalProject.EventManager.io.repository.EventRepository;
import com.pw2.finalProject.EventManager.service.EventService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.List;

@Service
public class EventServiceImpl implements EventService {
    @Autowired
    EventRepository eventRepository;

    @Override
    public EventDto createEvent(EventDto eventDto) {
        EventEntityOne eventEntityOne = new EventEntityOne();
        BeanUtils.copyProperties(eventDto, eventEntityOne);

        File file = new File("C:\\Users\\tauan\\Pictures\\mhealth.jpg");
        byte[] bFile = new byte[(int) file.length()];

        try {
            FileInputStream fileInputStream = new FileInputStream(file);
            fileInputStream.read(bFile);
            fileInputStream.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        eventEntityOne.setPicByte(bFile);
        EventEntityOne storedEvent = eventRepository.save(eventEntityOne);

        EventDto returnValue = new EventDto();
        BeanUtils.copyProperties(storedEvent, returnValue);

        return returnValue;
    }

    @Override
    public long getTotalEvents(int page, int limit) {
        if(page > 0) page = page - 1;

        Pageable pageableRequest = PageRequest.of(page, limit);

        Page<EventEntityOne> eventsPage =  eventRepository.findAll(pageableRequest);

        return eventsPage.getTotalElements();
    }

    @Override
    public List<EventDto> getEvents(int page, int limit) {
        List<EventDto> returnValue = new ArrayList<>();

        if(page > 0) page = page - 1;

        Pageable pageableRequest = PageRequest.of(page, limit);

        Page<EventEntityOne> eventsPage =  eventRepository.findAll(pageableRequest);
        List<EventEntityOne> events = eventsPage.getContent();

        for(EventEntityOne eventEntity : events){
            EventDto eventDto = new EventDto();
            BeanUtils.copyProperties(eventEntity, eventDto);
            returnValue.add(eventDto);
        }

        return returnValue;
    }

    @Override
    public EventDto getEventByName(String name) {
        ModelMapper modelMapper = new ModelMapper();

        EventEntityOne storedEvents = eventRepository.findEventByName(name);

        EventDto returnValue = new EventDto();

        returnValue = modelMapper.map(storedEvents, EventDto.class);

        return returnValue;
    }

    public List<EventDto> getAllEvents(){
        List<EventDto> returnValue = new ArrayList<>();

        Iterable<EventEntityOne> a = eventRepository.findAll();

        for(EventEntityOne event: a){
                EventDto eventDto = new EventDto();
                BeanUtils.copyProperties(event, eventDto);
                returnValue.add(eventDto);
        }
        return returnValue;

    }

    @Override
    public EventDto getEventById(long id) {
        ModelMapper modelMapper = new ModelMapper();

        EventEntityOne storedEvents = eventRepository.findEventById(id);

        EventDto returnValue = new EventDto();

        returnValue = modelMapper.map(storedEvents, EventDto.class);

        return returnValue;
    }

    @Override
    public void likeEvent(EventDto event) {
        EventEntityOne eventEntity = new EventEntityOne();
        BeanUtils.copyProperties(event, eventEntity);

        long likes = eventEntity.getNumberOfLikes();
        eventEntity.setNumberOfLikes(likes = likes + 1);

        EventEntityOne storedUserDetails = eventRepository.save(eventEntity);

        EventDto returnValue = new EventDto();
        BeanUtils.copyProperties(storedUserDetails, returnValue);
    }
}
