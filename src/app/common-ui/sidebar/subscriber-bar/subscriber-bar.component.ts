import {Component, Input} from '@angular/core';
import {Profile} from "../../../data/interfaces/profile.interface";
import {ImgUrlPipe} from "../../../helpers/pipes/img-url.pipe";

@Component({
  selector: 'app-subscriber-bar',
  standalone: true,
  imports: [
    ImgUrlPipe
  ],
  templateUrl: './subscriber-bar.component.html',
  styleUrl: './subscriber-bar.component.scss'
})
export class SubscriberBarComponent {
  @Input() profile!: Profile



}
