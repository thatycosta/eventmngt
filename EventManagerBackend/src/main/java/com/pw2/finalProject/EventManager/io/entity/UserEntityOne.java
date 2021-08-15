package com.pw2.finalProject.EventManager.io.entity;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Entity(name="user_one")
public class UserEntityOne implements Serializable {

    private static final long serialVersionUID = 428489433384084598L;

    @Id
    @GeneratedValue
    private long id;

    @Column(nullable = false)
    private String userId;

    @Column(nullable = false, length = 50)
    private String firstName;

    @Column(nullable = false, length = 50)
    private String lastName;

    @Column(nullable = false, length = 120)
    private String email;

    @Column(nullable = false)
    private String encryptedPassword;

    private String emailVerificationToken;

    @Column(nullable = false)
    private Boolean emailVerificationStatus = false;

    @ManyToMany
    @JoinTable(
            name = "user_event_subscription_two",
            joinColumns = @JoinColumn(name = "user_entity_one_id"),
            inverseJoinColumns = @JoinColumn(name = "event_entity_two_id"))
    private Set<EventEntityOne> eventsentitiesone;

    @Column
    @ElementCollection
    private Set<EventEntityOne> eventsLiked;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEncryptedPassword() {
        return encryptedPassword;
    }

    public void setEncryptedPassword(String encryptedPassword) {
        this.encryptedPassword = encryptedPassword;
    }

    public String getEmailVerificationToken() {
        return emailVerificationToken;
    }

    public void setEmailVerificationToken(String emailVerificationToken) {
        this.emailVerificationToken = emailVerificationToken;
    }

    public Boolean getEmailVerificationStatus() {
        return emailVerificationStatus;
    }

    public void setEmailVerificationStatus(Boolean emailVerificationStatus) {
        this.emailVerificationStatus = emailVerificationStatus;
    }

    public Set<EventEntityOne> getEventEntities() {
        return eventsentitiesone;
    }

    public void setEventEntities(Set<EventEntityOne> eventEntities) {
        this.eventsentitiesone = eventEntities;
    }

    public Set<EventEntityOne> getEventsLiked() {
        return eventsLiked;
    }

    public void setEventsLiked(Set<EventEntityOne> eventsLiked) {
        this.eventsLiked = eventsLiked;
    }
}
