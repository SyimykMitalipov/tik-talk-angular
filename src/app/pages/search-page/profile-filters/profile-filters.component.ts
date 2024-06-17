import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {AvatarUploadComponent} from "../../settings-page/avatar-upload/avatar-upload.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ProfileService} from "../../../data/services/profile.service";
import {debounceTime, startWith, Subscription, switchMap} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-profile-filters',
  standalone: true,
  imports: [
    AvatarUploadComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss'
})
export class ProfileFiltersComponent implements OnDestroy {
  fb = inject(FormBuilder)
  profileService= inject(ProfileService)

  searchForm = this.fb.group({
    firstName: [''],
    lastName:[''],
    stack: ['']
  })

  searchSub!: Subscription;
  constructor() {
   this.searchSub = this.searchForm.valueChanges.pipe(
      startWith({}),
      debounceTime(300),
      switchMap((formValue) => {
          return this.profileService.filterProfiles(formValue)
      })
    )
      .subscribe()
  }


  ngOnDestroy() {
  this.searchSub.unsubscribe()
  }
}
