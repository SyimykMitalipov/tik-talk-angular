import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Profile} from "../interfaces/profile.interface";
import {Pageable} from "../interfaces/pageable.interface";
import {map, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  http = inject(HttpClient);
  constructor() { }

  baseApiUrl = 'https://icherniakov.ru/yt-course/'

  me = signal<Profile | null>(null)

  filteredProfiles = signal<Profile[] >([])

  getTestAccounts(){
    return this.http.get<Profile[]>(`${this.baseApiUrl}account/test_accounts`)
  }

  getSubscribersShortList(subsAmount = 3) {
    return this.http.get<Pageable<Profile>>(`${this.baseApiUrl}account/subscribers/`)
      .pipe(
        map(res =>  res.items.slice(0, subsAmount))
      )
  }

  getAccount(id: string) {
      return this.http.get<Profile>(`${this.baseApiUrl}account/${id}`)
  }

  getMe() {
    return this.http.get<Profile>(`${this.baseApiUrl}account/me`)
      .pipe(
        tap((val) => this.me.set(val)),
      )
  }

  patchProfile(profile: Partial<Profile>) {
    return this.http.patch<Profile>(`${this.baseApiUrl}account/me`, profile)
  }

  uploadAvatar(avatar: File) {
    const fd = new FormData()
    fd.append('image', avatar)
    return this.http.post<Profile>(`${this.baseApiUrl}account/upload_image`, fd)

  }
  filterProfiles(params: Record<string, any>) {
    return this.http.get<Pageable<Profile>>(`${this.baseApiUrl}account/accounts`, {
      params
    })
      .pipe(
        tap((val) => this.filteredProfiles.set(val.items)),
      )
  }
}
