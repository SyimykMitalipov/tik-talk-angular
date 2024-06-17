import {Component, inject} from '@angular/core';
import {SvgIconComponent} from "../svg-icon/svg-icon.component";
import {AsyncPipe, JsonPipe, NgForOf} from "@angular/common";
import {SubscriberBarComponent} from "./subscriber-bar/subscriber-bar.component";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {ProfileService} from "../../data/services/profile.service";
import {firstValueFrom, map} from "rxjs";
import {ImgUrlPipe} from "../../helpers/pipes/img-url.pipe";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SvgIconComponent,
    NgForOf,
    SubscriberBarComponent,
    RouterLink,
    AsyncPipe,
    JsonPipe,
    ImgUrlPipe,
    RouterLinkActive
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  profileService = inject(ProfileService);

  subscribers$ = this.profileService.getSubscribersShortList(3)

  me = this.profileService.me

  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: 'profile/me'
    },
    {
      label: 'Чаты',
      icon: 'chat',
      link: 'chats'
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: 'search'
    },

  ]


  ngOnInit() {
    firstValueFrom(this.profileService.getMe())
  }
}
