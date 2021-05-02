import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Member } from '../_models/member';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];

  constructor(private http: HttpClient) {}

  getMembers(): Observable<Member[]> {
    if (this.members.length > 0) {
      return of(this.members);
    }

    return this.http.get<Member[]>(`${this.baseUrl}/users`).pipe(
      map((members) => {
        this.members = members;
        return this.members;
      })
    );
  }

  getMember(username): Observable<Member> {
    const member = this.members.find(
      (eachMember) => eachMember.username === username
    );
    if (member !== undefined) {
      return of(member);
    }
    return this.http.get<Member>(`${this.baseUrl}/users/${username}`);
  }

  updateMember(member: Member): Observable<any> {
    return this.http.put(`${this.baseUrl}/users`, member).pipe(
      map(() => {
        this.members = this.members.map((eachMember) =>
          eachMember.username === member.username ? member : eachMember
        );
      })
    );
  }

  setMainPhoto(photoId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/set-main-photo/${photoId}`, {});
  }
}
