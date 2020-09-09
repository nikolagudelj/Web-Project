package beans.model.entities;

import java.util.Calendar;

import beans.model.enums.ReservationStatus;
import beans.model.template.DatabaseEntity;


public class Reservation extends DatabaseEntity {
	
   public Calendar startingDate;
   public int numberOfNights;
   public Double price;
   public String reservationMessage;
   public ReservationStatus status;
   
   public String guestID;
   public Apartment apartment;
   
   public Reservation() {
	   status = ReservationStatus.CREATED;
   }
   
   @Override
   public void validate() {
   	// TODO Auto-generated method stub
   	
   }


}