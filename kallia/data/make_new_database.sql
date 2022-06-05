/*account id will have to be something complex, haven't figured it out yet*/

CREATE TABLE ACCOUNT ( 
	AccountID SERIAL NOT NULL,
    AccountName varchar(16) NOT NULL UNIQUE, 
    AccountPassword varchar(100) NOT NULL, 
	FullName varchar(100), 
	Email varchar(100) NOT NULL,
    AdminRights boolean DEFAULT FALSE NOT NULL, 
    PRIMARY KEY(AccountID)
);

CREATE TABLE USERACCOUNT ( 
	UserAccountID SERIAL NOT NULL, 
    UserName varchar(100) NOT NULL, 
    FOREIGN KEY(UserName) REFERENCES ACCOUNT (AccountName),
    PRIMARY KEY(UserAccountID)
);

CREATE TABLE ADMINACCOUNT  (
	AdminAccountID SERIAL NOT NULL, 
    AdminName varchar(100) NOT NULL, 
    FOREIGN KEY(AdminName) REFERENCES ACCOUNT (AccountName),
    PRIMARY KEY(AdminAccountID)
); 

/*C_int where int is the same as order on reservations table*/ 

CREATE TABLE COURT (
    CourtID varchar(100) NOT NULL, 
    CourtType text,
    PRIMARY KEY (CourtID)
);

/*TT_int where int is the same as order on reservations table*/ 

CREATE TABLE TABLETIMES(
    TableTimeID integer NOT NULL, 
    TableHour varchar(5) NOT NULL, 
    PRIMARY KEY(TableTimeID)
);

/*TD_int where int is the same as order on reservations table and changes with each new day*/
/*DONE*/
/*CREATE TABLE TABLEDATES (
    TableDateID varchar(100) NOT NULL, 
    TableDate date NOT NULL,
    PRIMARY KEY(TableDateID)
);*/

 
/*TS_int where int is a combination of day and time ints, gets updated with each new day*/
/*this one will be updated from server everyday at midnight: contents will be copied > table will be truncated > 
then contents will be rewriten with all slots available and reservations will be applied*/
/*CREATE TABLE TIMESLOT ( 
    TimeSlotID varchar(100) NOT NULL, 
	DayID varchar(100) NOT NULL, 
    TimeID varchar(100) NOT NULL, 
    Availability boolean DEFAULT TRUE NOT NULL, 
    CourtID varchar(100) NOT NULL, 
    FOREIGN KEY(TimeID) REFERENCES TABLETIMES(TableTimeID), 
    FOREIGN KEY(DayID) REFERENCES TABLEDATES(TableDateID), 
    FOREIGN KEY(CourtID) REFERENCES COURT(CourtID),
    PRIMARY KEY(TimeSlotID)
);*/

/*RES_date_int where date is simplified date and int is lenght of selections, deleted when date past*/

CREATE TABLE RESERVATION ( 
    ReservationID SERIAL NOT NULL, 
    ReservationDate varchar(10) NOT NULL, 
    ReservationTime varchar(5) NOT NULL, 
    CourtID varchar(100) NOT NULL,
    ReserveeID integer NOT NULL,
    FOREIGN KEY(ReserveeID) REFERENCES USERACCOUNT (UserAccountID),
    FOREIGN KEY(CourtID) REFERENCES COURT (CourtID), 
    PRIMARY KEY(ReservationID) 
);

/*TOUR_int where int is place on tournaments table*/ 

CREATE TABLE TOURNAMENT (
    TournamentID varchar(100) NOT NULL, 
    Title text NOT NULL, 
    StartDate date, 
    EndDate date, 
    SkillLevel integer, 
    AgeRestrictions integer,
    PRIMARY KEY(TournamentID)
);

CREATE TABLE joins ( 
    ParticipantID integer NOT NULL, 
    TournamentID varchar(100) NOT NULL, 
    FOREIGN KEY(ParticipantID) REFERENCES USERACCOUNT(UserAccountID), 
    FOREIGN KEY(TournamentID) REFERENCES TOURNAMENT(TournamentID)
);

