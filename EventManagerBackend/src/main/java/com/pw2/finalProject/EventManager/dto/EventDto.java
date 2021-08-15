package com.pw2.finalProject.EventManager.dto;

import com.pw2.finalProject.EventManager.io.entity.UserEntityOne;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Set;

public class EventDto implements Serializable {
    private static final long serialVersionUID = 331841542587484845L;
    private long id;
    private String name;
    private LocalDate startDate;
    private LocalDate endDate;
    private String description;
    private String local;
    private long numberOfLikes;
    private byte[] picByte;
    private Set<UserEntityOne> eventsentitiesone;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getLocal() {
        return local;
    }

    public void setLocal(String local) {
        this.local = local;
    }

    public long getNumberOfLikes() {
        return numberOfLikes;
    }

    public void setNumberOfLikes(long numberOfLikes) {
        this.numberOfLikes = numberOfLikes;
    }

    public Set<UserEntityOne> getEventsentitiesone() {
        return eventsentitiesone;
    }

    public void setEventsentitiesone(Set<UserEntityOne> eventsentitiesone) {
        this.eventsentitiesone = eventsentitiesone;
    }

    public byte[] getPicByte() {
        return picByte;
    }

    public void setPicByte(byte[] picByte) {
        this.picByte = picByte;
    }
}

