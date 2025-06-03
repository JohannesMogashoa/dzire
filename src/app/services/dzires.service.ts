import {
  CollectionReference,
  DocumentReference,
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  getDoc,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';

import { AuthenticationService } from './auth.service';
import { DzireInterface } from '../models/dzire.interface';
import { DzireItemInterface } from '../models/dzire-item.interface';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DzireService {
  constructor(
    private firestore: Firestore,
    private authService: AuthenticationService
  ) {}

  async fetchDziresForUser(userId: string): Promise<DzireInterface[]> {
    const usersRef = collection(this.firestore, 'users');
    const userQuery = query(usersRef, where('authId', '==', userId));
    const userSnap = await getDocs(userQuery);

    if (userSnap.empty) return [];

    const userDoc = userSnap.docs[0];
    const dziresRef = collection(this.firestore, 'users', userDoc.id, 'dzires');
    const dziresSnap = await getDocs(dziresRef);

    const dzirePromises = dziresSnap.docs.map(async (dzireDoc) => {
      const dzireData = dzireDoc.data();

      const itemsRef = collection(
        this.firestore,
        'users',
        userDoc.id,
        'dzires',
        dzireDoc.id,
        'dzire-items'
      );
      const itemsSnap = await getDocs(itemsRef);

      const items: DzireItemInterface[] = itemsSnap.docs.map((itemDoc) => {
        const itemData = itemDoc.data();
        return {
          id: itemDoc.id,
          title: itemData['title'],
          description: itemData['description'],
          reserved: itemData['reserved'],
          reservedDate: itemData['reservedDate']?.toDate?.() ?? undefined,
        };
      });

      const dzire: DzireInterface = {
        id: dzireDoc.id,
        title: dzireData['title'],
        description: dzireData['description'],
        endDate: dzireData['endDate'].toDate?.(),
        createDate: dzireData['createDate'].toDate?.(),
        imageUrl: dzireData['imageUrl'],
        items,
      };

      return dzire;
    });

    return await Promise.all(dzirePromises);
  }
}
