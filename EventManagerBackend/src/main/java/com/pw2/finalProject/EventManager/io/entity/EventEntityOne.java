package com.pw2.finalProject.EventManager.io.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Set;

@Entity(name="events_two")
public class EventEntityOne implements Serializable {

    private static final long serialVersionUID = 314822572587444825L;

    @Id
    @GeneratedValue
    private long id;

    @Column(length = 200)
    private String name;

    @Column
    private LocalDate startDate;

    @Column
    private LocalDate endDate;

    @Lob
    @Column(name="description", length=3000)
    private String description;

    @Column
    private String local;

    @Column
    private long numberOfLikes;

    @Lob
    @Column(name = "picByte")
    private byte[] picByte;

    @ManyToMany(mappedBy = "eventsentitiesone")
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

    public byte[] getPicByte() {
        return picByte;
    }

    public void setPicByte(byte[] picByte) {
        this.picByte = picByte;
    }

    public Set<UserEntityOne> getEventsentitiesone() {
        return eventsentitiesone;
    }

    public void setEventsentitiesone(Set<UserEntityOne> eventsentitiesone) {
        this.eventsentitiesone = eventsentitiesone;
    }
}
