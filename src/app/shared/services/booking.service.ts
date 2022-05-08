import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@angular/fire/firestore';
import { Booking } from '../models/Booking';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  collectionName = 'Bookings'

  constructor(private afs: AngularFirestore) { }

  book(booking: Booking) {
    booking.id = this.afs.createId();
    return this.afs.collection<Booking>(this.collectionName).doc(booking.id).set(booking);
  }

  getAll(userId: string) {
    return this.afs.collection<Booking>(this.collectionName, ref => ref.where('userId', '==', userId).where('date', '>', (new Date().getTime() / 1000)).orderBy('date', 'asc')).valueChanges();
  }

  delete(id: string) {
    return this.afs.collection<Comment>(this.collectionName).doc(id).delete();
  }
}
